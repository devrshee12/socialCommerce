const express = require('express')
const router = express.Router()
const {addProductInCart, deleteProductFromCart,getAllProductCarts, updateProductInCart} = require("../controllers/Cart");
const {authorization} = require("../middleware/Auth")

router.post('/add', authorization, addProductInCart)
router.post('/delete',authorization, deleteProductFromCart)
router.get('/:userId/getAll',authorization, getAllProductCarts)
router.post('/update',authorization, updateProductInCart)

module.exports = router
