const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');

router.use('/', userController);

module.exports = router;