const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('FormOrder');
});
  
router.get('/lich-su-don-hang', (req, res) => {
    res.render('FormHistoryOrder');
});

module.exports = router;