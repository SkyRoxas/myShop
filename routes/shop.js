const path = require('path')

const rootDir = require('./../util/path')
const adminData = require('./admin')

const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    const {products} = adminData
    console.log('products :', products);
    res.render('shop', {prods: products, docTitle: 'Shop'})
})

module.exports = router