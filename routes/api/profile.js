const express = require('express')
const router = express.Router();

// GET api/users

router.get('/', (req, res) => res.send('Profile route'));

module.exports = router;