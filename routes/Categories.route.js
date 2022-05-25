const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('FormProductCategory');
});
  
router.get('/tac-gia', (req, res) => {
    res.render('FormProductWritter');
});

router.get('/nha-xuat-ban', (req, res) => {
    res.render('FormProductNXB');
});

module.exports = router;