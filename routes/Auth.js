const express = require('express')
const router = express.Router()
const {register, login} = require("../controllers/Auth");
const {checkUserExists} = require("../middleware/Auth")
router.post('/register', checkUserExists, register)
router.post('/login', login)
module.exports = router
