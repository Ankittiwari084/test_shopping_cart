const express = require('express');
const { login, cartDetails } = require('../controller/user');
const { loginValidation} = require('../validation/user');
const { verifyToken } = require('../auth/verifyToken');

const router = express.Router();

router.post('/login',loginValidation,login);
router.get('/cart/details',verifyToken,cartDetails);



// check only token is valid or not.
module.exports = router;