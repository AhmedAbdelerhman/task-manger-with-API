const Auth = require('../controllers/auth')
const express = require('express')

const router = express()

router.post("/login",Auth.postLogIn)



module.exports = router