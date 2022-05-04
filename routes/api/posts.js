const express = require('express')
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Post = require("../../modals/post");
const Profile = require('../../modals/profile');
const User = require('../../modals/User');


// POST api/users

router.post('/', [ auth, 
    check('text', 'Text is required').not().isEmpty()
], 
 async (req, res) => {
     const errors = validationResult(req);
     if(!errors.isEmpty()){
         return res.status(400).json({ errors: errors.array() });
     }

     try {
        const user = await User.findById(req.user.id).select('-password');

        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        })

        const post = await newPost.save();

        res.json(post)
         
     } catch (error) {
         console.log(error,"error");
         res.status(500).send('Server Error')
     }

 });

// GET api/users
// private
// Get all posts

router.get('/', auth, async (req,res) => {
    try {
        const posts = await Post.find().sort({ date: -1});
        res.json(posts);
    } catch (error) {
        console.log(error,"error");
         res.status(500).send('Server Error')
    }
});

// GET api/posts/:id
// private
// Get all posts

router.get('/:id', auth, async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);

        if(!post){
            return res.status(404).json({ msg: 'Post not found'});
        }

        res.json(post);
    } catch (error) {
        console.log(error,"error");

        if(error.kind === 'ObjectId'){
            return res.status(404).json({ msg: 'Post not found'});
        }

         res.status(500).send('Server Error')
    }
});

// DELETE api/post
// private
// Get all posts

router.delete('/:id', auth, async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);

        if(!post){
            return res.status(404).json({ msg: 'Post not found'});
        }

        // CHeck User
        if(post.user.toString() !== req.user.id){
            return res.status(401).json({ msg: 'User not authorized'});
        }

        await post.remove();

        res.json({ msg: 'Post removed'})

        res.json(post);
    } catch (error) {
        console.log(error,"error");

        if(error.kind === 'ObjectId'){
            return res.status(404).json({ msg: 'Post not found'});
        }

         res.status(500).send('Server Error')
    }
});

module.exports = router;