const {Router} = require('express')
const router = Router();

const {
    renderProductsForm, 
    createNewProduct, 
    renderProducts, 
    renderEditForm, 
    updateProduct, 
    deleteProduct
} = require('../controllers/products.controller')

const {isAuthenticated} = require('../helpers/auth')

// New Product
router.get('/products/add',isAuthenticated , renderProductsForm)

router.post('/products/new-product',isAuthenticated , createNewProduct)

// Get all Product
router.get('/products',isAuthenticated , renderProducts)

// Edit Products
router.get('/products/edit/:id',isAuthenticated , renderEditForm)

router.put('/products/edit/:id',isAuthenticated , updateProduct)

// Delete Products
router.delete('/products/delete/:id',isAuthenticated , deleteProduct)

module.exports = router;