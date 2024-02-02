const express = require('express')
const router = express.Router()
const {addRating, getAllRating, viewRating, deleteRating, updateRating, getProductRatings} = require("../controllers/Rating");
const {authorization} = require("../middleware/Auth")

router.post('/', authorization, addRating)
router.post('/getAll',authorization, getAllRating)
router.post('/product/getAll',authorization, getProductRatings)
router.get('/:ratingId', authorization, viewRating)
router.delete('/:ratingId', authorization, deleteRating)
router.put('/:ratingId', authorization, updateRating)
module.exports = router
