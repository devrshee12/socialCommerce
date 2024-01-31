const express = require('express')
const router = express.Router()
const {addComment, getAllComments, deleteComment, updateComment, viewComment} = require("../controllers/Comment");
const {authorization} = require("../middleware/Auth")

router.post('/', authorization, addComment)
router.post('/getAll',authorization, getAllComments)
router.get('/:commentId', authorization, viewComment)
router.delete('/:commentId', authorization, deleteComment)
router.put('/:commentId', authorization, updateComment)
module.exports = router
