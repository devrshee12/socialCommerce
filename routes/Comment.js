const express = require('express')
const router = express.Router()
const {addComment, getAllComments, deleteComment, updateComment, viewComment, getAllProductComment} = require("../controllers/Comment");
const {authorization} = require("../middleware/Auth")

router.post('/', authorization, addComment)
router.post('/getAll',authorization, getAllComments)
router.post('/product/getAll',authorization, getAllProductComment)
router.get('/:commentId', authorization, viewComment)
router.delete('/:commentId', authorization, deleteComment)
router.put('/:commentId', authorization, updateComment)
module.exports = router
