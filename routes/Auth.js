const express = require('express')
const router = express.Router()
const {register, login, verifyUser} = require("../controllers/Auth");
const {checkUserExists, authorization} = require("../middleware/Auth")
router.post('/register', checkUserExists, register)
router.post('/login', login)
router.get('/verifyUser', authorization, verifyUser)
module.exports = router
