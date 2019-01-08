const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, description, price);
  product.save()
    .then(() => {
      res.redirect('/')
    })
    .catch(err => console.log(err))
  // res.redirect('/admin/products');
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit
  console.log('editMode :', editMode);
  if(!editMode){
    res.redirect('/')
    return
  }
  const prodId = req.params.productId

  Product.findById(prodId, product => {
    if(!product){
      return res.redirect('/')
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product
    });
  })

};

exports.postEditProduct = (req, res, next) => {
  const proId = req.body.productId
  const updateTitle = req.body.title
  const updatePrice = req.body.price
  const updateImageUrl = req.body.imageUrl
  const updateDesc = req.body.description
  const updateProduct = new Product(proId, updateTitle, updateImageUrl, updateDesc, updatePrice)
  console.log('edit product');
  updateProduct.save()
  res.redirect('/admin')
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};


exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId
  Product.deleteById(prodId)
  res.redirect('/admin/products')
}