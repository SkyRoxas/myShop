const path = require('path')

const express = require('express')

const router = express.Router()

router.get('/add-product', (req, res, next) => {
    res.sendfile(path.join(__dirname, '../', 'views', 'add-product.html'))
})

router.post('/product', (req, res, next) => {
    console.log('req.body :', req.body);
    res.redirect('/')
})


module.exports = router