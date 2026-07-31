const {handleUserRegister, handleUserLogin}= require("../controllers/userControllers");
const express = require('express');
const router = express.Router();

router.post('/register',handleUserRegister);
router.post('/login',handleUserLogin)


module.exports = router;

