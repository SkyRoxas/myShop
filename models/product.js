const fs = require('fs')
const path = require('path')

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'product.json'
)

const getProductFromDile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if(err) return cb([])
        cb(JSON.parse(fileContent))
    })
}

module.exports = class Product {
    constructor(title){
        this.title = title
    }

    save(){
        getProductFromDile(products => {
            products.push(this)
            fs.writeFileSync(p, JSON.stringify(products), err => {
                console.log('err :', err);
            })
        })
    }

    static fetchAll(cb) {
        getProductFromDile(cb)
    }
}