const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');

router.get('/', (req, res) => {
    res.render('HomePage');
})
router.post('/', userController.registerUser);

module.exports = router;