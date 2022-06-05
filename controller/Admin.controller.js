const bcrypt = require('bcrypt');
const Employee = require('../model/Employee.model');
const Admin = require('../model/Admin.model');
const validator = require('email-validator');
validator.validate('test@email.com');

const adminController = {
    // Register
    createEmployee: async(req, res) => {
        try {
            // Hash Password
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(req.body.password, salt);

            // Khoi tao bien Employee
            const employee = await new Employee({
                name: req.body.name,
                username: req.body.username,
                password: hash,
                email: req.body.email,
                phone: req.body.phone,
                avatar: ""
            });

            // Validate Thong tin cua Nhan vien
            const usernameEmp = await Employee.findOne({username: req.body.username});
            const emailAccount = await Employee.findOne({email: req.body.email});
            const phoneAccount = await Employee.findOne({phone: req.body.phone});
            const errorsEmp = [];
            if(!req.body.username ||
                !req.body.password ||
                !req.body.name) {
                errorsEmp.push('Bạn đã nhập thiếu thông tin nhân viên, vui lòng kiểm tra lại!');
            } else {
                if(req.body.username.length < 4) {
                    errorsEmp.push('Vui lòng nhập một tài khoản dài hơn');
                }
                if(req.body.password < 6) {
                    errorsEmp.push('Vui lòng nhập một mật khẩu dài hơn');
                }
                if(usernameEmp) {
                    errorsEmp.push('Tài khoản nhân viên đã tồn tại');
                }
                if(emailAccount) {
                    errorsEmp.push('Email đã tồn tại');
                }
                if(phoneAccount) {
                    errorsEmp.push('Số điện thoại đã tồn tại');
                }
                if(!checkEmail(req.body.email)) {
                    errorsEmp.push('Vui lòng nhập đúng định dạng email');
                }
                if(!checkNumberPhone(req.body.phone)) {
                    errorsEmp.push('Vui lòng nhập đúng định dạng số điện thoại');
                }
            } 
            
            if(errorsEmp.length) {
                res.render('Admin/AdminEmployee', {
                    errorsEmp: errorsEmp,
                    valuesEmp: req.body
                });
                return;
            } else {
                await employee.save((err, table) => {
                    if(!err) {
                        console.log(table.avatar);
                        res.render('Admin/AdminEmployee', {
                            table: table,
                        });
                    }
                    else {
                        errorsEmp.push('Thêm nhân viên thất bại !');
                    }  
                });
            }  
        } catch(err) {
            console.log('Create employee failed!!! ' + err);
        }
    },

    // Login
    loginAdmin: async(req, res) => {
        try {
            const errorsLoginAdmin = [];
            if(!req.body.username ||
                !req.body.password ) {
                errorsLoginAdmin.push('Bạn đã nhập thiếu thông tin, vui lòng kiểm tra lại!');
            } else {
                const admin = await Admin.findOne({ username: req.body.username });
                if(!admin) {
                    errorsLoginAdmin.push('Sai tài khoản đăng nhập');
                } else {
                    const validPassword = req.body.password === admin.password;
                    if(!validPassword) {
                        errorsLoginAdmin.push('Sai mật khẩu đăng nhập');
                    } else {
                        if(admin && validPassword) {
                            req.session.isAuthenticatedAdmin = true;
                            req.session.authAdmin = admin;
                            res.redirect('/admin');
                        }
                    }
                }
            }

            if(errorsLoginAdmin.length) {
                res.render('Admin/Admin', {
                    errorsLoginAdmin: errorsLoginAdmin,
                    valuesLogin: req.body
                });
                return;
            } 
        } catch(err) {
            console.log('Login failed!!! ' + err);
        }
    },

    // Update
    updateInfoEmployee: async(req, res) => {
        try {
            req.body.avatar = req.file.path;
            Employee.findOneAndUpdate({ _id : req.body._id }, req.body, {new: true}, (err, doc) => {
                if(!err) {
                    res.redirect(`/admin/employee/${req.body._id}`);
                } else {
                    if(err.name === 'ValidationError') {
                        handleValidationError(err, req.body);
                    }
                }
            });
        } catch(err) {
            console.log('Update failed!!! ' + err);
        }
    }
};

// Validate Email
function checkEmail(mail) {
    const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    if (!mail)
    return false;

    if(mail.length>254)
        return false;

    var valid = emailRegex.test(mail);
    if(!valid)
        return false;

    var parts = mail.split('@');
    if(parts[0].length>64)
        return false;

    var domainParts = parts[1].split('.');
    if(domainParts.some(function(part) { return part.length>63; }))
        return false;

    return true; 
}
 
// Validate Phone
function checkNumberPhone(number) {
    const phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!number)
    return false;

    if(number.length>10)
        return false;

    var valid = phoneno.test(number);
    if(!valid)
        return false;

    return true; 
}

module.exports = adminController;