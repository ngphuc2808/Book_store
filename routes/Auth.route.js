const express = require('express');
const multer  = require('multer')
const upload = multer({ dest: './public/uploads/' });
const router = express.Router();
const authController = require('../controller/Auth.controller');
const restrict = require('../middlewares/Auth.middleware');
const User = require('../model/User.model');

router.get('/thong-tin-ca-nhan/:id', restrict, (req, res) => {
    User.findById(req.params.id, (err, doc) => {
        if(!err) {
            res.render('FormUserProfile', {
                user: doc
            })
        }
    });
});

router.get('/thong-tin-ca-nhan', restrict, (req, res) => {
    res.render('FormUserProfile');
});

router.post('/thong-tin-ca-nhan', authController.loginUser);

router.post('/dang-xuat', restrict, async (req, res) => {
    req.session.isAuthenticated = false;
    req.session.authUser = null;
    res.redirect(req.headers.referer);
});

router.get('/trang-chu', async (req, res) => {
    res.render('HomePage');
})
router.post('/trang-chu', authController.registerUser);

router.post('/trang-thong-tin', upload.single('avatar'), authController.updateInfo);

module.exports = router;