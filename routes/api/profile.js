const express = require('express')
const router = express.Router();
const auth = require('../../middleware/auth')
// GET api/users
const Profile = require('../../modals/profile')
const User = require('../../modals/User')

router.get('/me', auth, async (req, res) => {
    try{
        const profile = await Profile.findOne({ user: req.user.id}).populate('user',
        ['name', 'avatar']);

        if(!profile){
            return res.status(400).json({msg: 'There is no profile for this user'})
        }
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error')
    }
});

module.exports = router;