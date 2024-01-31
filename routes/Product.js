const express = require('express')
const router = express.Router()
const {createProduct, getAllProducts, deleteProduct, getProduct,updateProduct} = require("../controllers/Product");
const {authorization} = require("../middleware/Auth")

router.post('/', authorization, createProduct)
router.get('/getAll', getAllProducts)
router.get('/:productId', getProduct)
router.delete('/:productId', authorization, deleteProduct)
router.put('/:productId', authorization, updateProduct)
module.exports = router
