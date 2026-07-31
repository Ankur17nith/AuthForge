const {handleUserRegister, handleUserLogin, handleUserLogout}= require("../controllers/userControllers");
const {protect}= require('../middlewares/authMiddleware')
const express = require('express');
const router = express.Router();

router.post('/auth/register',handleUserRegister);
router.post('/auth/login',handleUserLogin);
router.post('/auth/logout',handleUserLogout);
router.get('/users/me', protect,(req, res) => res.json({ userId: req.user.userId }))


module.exports = router;

