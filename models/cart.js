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

            if(!err && fileContent){
                cart = JSON.parse(fileContent)
                cart = cart.products ? cart : {products: [], totalPrice: 0}
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

    static deleteProduct(id, productPrice){
        fs.readFile(p, (err, fileContent) => {
            if(err){
                return
            }
            const updateProduct = JSON.parse(fileContent)
            const product = updateProduct.products.find(prod => [prod.id === id])
            const productQty = product.qty
            updateProduct.products = updateProduct.products.filter(prod => prod.id !== id)
            updateProduct.totalPrice = updateProduct.totalPrice - productPrice * productQty

            fs.writeFile(p, JSON.stringify(updateProduct), err => {
                console.log(err)
            })
        })
    }
}