const express = require('express');
const { productList } = require('../controller/product');

const router = express.Router();

router.get('/list',productList);

module.exports = router;