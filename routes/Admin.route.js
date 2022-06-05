const express = require('express');
const multer  = require('multer')
const upload = multer({ dest: './public/uploads/' });
const router = express.Router();
const adminController = require('../controller/Admin.controller');
const restrict = require('../middlewares/Auth.middleware');
const Employee = require('../model/Employee.model');
const User = require('../model/User.model');
const Admin = require('../model/Admin.model');
const restrictAdmin = require('../middlewares/AuthAdmin.middleware');

router.get('/', async (req, res) => {
    const a = await Admin.find().lean();
    res.render('Admin/Admin');
});

router.post('/', adminController.loginAdmin);

router.post('/dang-xuat', restrictAdmin, async (req, res) => {
    req.session.isAuthenticatedAdmin = false;
    req.session.authAdmin = null;
    res.redirect('/admin');
});

router.get('/user', restrictAdmin, async (req, res) => {
    const list = await User.find().lean();
    res.render('Admin/AdminUser', {
        users: list,
        empty: list.length === 0
    });
});

router.get('/employee', restrictAdmin, async (req, res) => {
    const listEmployee = await Employee.find().lean();
    res.render('Admin/AdminEmployee', {
        employees: listEmployee,
        emptyEmployee: listEmployee.length === 0
    });
});

router.post('/employee', adminController.createEmployee);

router.get('/employee/:id', restrictAdmin,async (req, res) => {
    const employee = await Employee.find({_id: req.params.id}).lean();
    res.render('Admin/AdminEditEmployee', {
        employee: employee
    });
});

router.post('/trang-thong-tin-nhan-vien', upload.single('avatar'), adminController.updateInfoEmployee);

router.get('/product', restrictAdmin, (req, res) => {
    res.render('Admin/AdminProduct');
});

router.get('/category', restrictAdmin, (req, res) => {
    res.render('Admin/AdminCategory');
});

module.exports = router;