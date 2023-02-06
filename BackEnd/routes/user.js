const express = require('express');
const router = express.Router();
const userController = require('../Controllers/user');
const auth = require('../middleware/auth');

router.post('/', auth, userController.check);
router.post('/signup', userController.signup);
router.post('/login', userController.login),


module.exports = router;