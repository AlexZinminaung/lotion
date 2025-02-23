const { register, login, profile, verify } = require("../controllers/userController")
const express = require("express")
const protected = require("../middlewares/protected")
const router = express.Router()


router.post('/register', register)
router.post('/login', login)
router.get('/profile', protected, profile)
router.get('/verify/:token', verify)


module.exports = router