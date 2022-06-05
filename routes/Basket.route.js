const express = require('express');
const router = express.Router();
const restrict = require('../middlewares/Auth.middleware');

router.get('/', restrict, (req, res) => {
    res.render('FormBasket');
});

module.exports = router;