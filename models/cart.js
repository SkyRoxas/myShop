const fs = require('fs')
const path = require('path')

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
)

module.exports = class Cart {
    constructor() {
        this.products = []
        this.totalPrice = 0
    }

    static addProduct(id, productPrice) {

        fs.readFile(p, (err, fileContent) => {
            let cart = {products: [], totalPrice: 0}
            if(!err){
                cart = JSON.parse(fileContent)
            }

            const existingProductIndex = cart.products.findIndex(prod => prod.id === id)
            const existingProduct = cart.products[existingProductIndex]

            if(existingProduct){
                let updateProduct = existingProduct
                updateProduct.qty += 1
                cart.products = [...cart.products]
                cart.products[existingProductIndex] = updateProduct
            } else {
                let updateProduct = {id, qty: 1}
                cart.products = [...cart.products, updateProduct]
            }
            cart.totalPrice += productPrice
            console.log('JSON.stringify(cart) :', JSON.stringify(cart));
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log('err :', err);
            })
        })

    }
}