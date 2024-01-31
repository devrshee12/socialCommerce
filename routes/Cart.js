const express = require('express')
const router = express.Router()
const {addProductInCart, deleteProductfromCart,getAllProductCarts} = require("../controllers/Cart");
const {authorization} = require("../middleware/Auth")

router.post('/add', authorization, addProductInCart)
router.post('/delete',authorization, deleteProductfromCart)
router.get('/:userId/getAll',authorization, getAllProductCarts)

module.exports = router
