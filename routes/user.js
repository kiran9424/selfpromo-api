const express = require('express');
const router = express.Router();

const {registerUser,loginUser} = require('../controllers/auth');


router.post('/registeruser',registerUser);
router.post('/login',loginUser);

module.exports = router;