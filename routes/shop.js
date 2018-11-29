const path = require('path')

const rootDir = require('./../util/path')
const adminData = require('./admin')

const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    console.log('adminData  :', adminData.products );
    res.sendFile(path.join(rootDir, 'views', 'shop.html'))
})

module.exports = router