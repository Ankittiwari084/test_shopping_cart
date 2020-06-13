const express = require('express');
const { addProductInCart } = require('../controller/cart');
const { validation } = require('../validation/cart');

const { verifyToken } = require('../auth/verifyToken');
const router = express.Router();

router.post('/add/product',verifyToken,validation,addProductInCart);

module.exports = router;