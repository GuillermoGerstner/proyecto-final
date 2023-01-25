const productsCtrl = {};

const Product = require('../models/Product');

productsCtrl.renderProductsForm = (req, res) => {
    res.render('products/new-product')
};

productsCtrl.createNewProduct = async (req, res) => {
    const {title, description, amount} = req.body;
    const newProduct = new Product({title, description, amount});
    newProduct.user = req.user.id;
    await newProduct.save();
    req.flash('success_msg', 'Product Added Successfully');
    res.redirect('/products')
};

productsCtrl.renderProducts = async (req, res) => {
    const products = await Product.find({user: req.user.id}).sort({createdAt: 'desc'}).lean();
    res.render('products/all-products', {products});
};

productsCtrl.renderEditForm = async (req, res) => {
    const product = await Product.findById(req.params.id).lean();
    if (product.user != req.user.id) {
        req.flash('error_msg', 'Not Authorized');
        return res.redirect('/products');
    }
    res.render('products/edit-product', {product});
};

productsCtrl.updateProduct = async (req, res) => {
    const {title, description, amount} = req.body;
    await Product.findByIdAndUpdate(req.params.id, {title, description, amount});
    req.flash('success_msg', 'Product Updated Successfully');
    res.redirect('/products');
};

productsCtrl.deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Product Deleted Successfully');
    res.redirect('/products')
};


module.exports = productsCtrl;