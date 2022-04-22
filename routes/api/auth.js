const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
// GET api/users

const User = require('../../modals/User');

router.get('/', auth, async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }catch(err){
        res.status(500).send('Server error');
    }
});

module.exports = router;