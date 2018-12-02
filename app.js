const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')
const expressHbs = require('express-handlebars')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const rootDir = require('./util/path')

const errorControll = require('./controllers/error')


const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use(errorControll.get404)

app.listen('3000')

