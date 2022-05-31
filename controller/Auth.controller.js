const bcrypt = require('bcrypt');
const User = require('../model/User.model');
const validator = require('email-validator');
validator.validate('test@email.com');

const authController = {
    // Register
    registerUser: async(req, res) => {
        try {
            // Hash Password
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(req.body.password, salt);

            // Khoi tao bien user
            const user = await new User({
                username: req.body.username,
                password: hash,
                name: "",
                dob: "",
                email: req.body.email,
                phone: req.body.phone,
                address: "",
                avatar: "",
                detail: "",
            });

            // Validate Thong tin cua User
            const usernameAccount = await User.findOne({username: req.body.username});
            const emailAccount = await User.findOne({email: req.body.email});
            const phoneAccount = await User.findOne({phone: req.body.phone});
            const errors = [];
            if(!req.body.username ||
                !req.body.password ||
                !req.body.email ||
                !req.body.phone ||
                !req.body.password ||
                !req.body.confirm ) {
                errors.push('Bạn đã nhập thiếu thông tin, vui lòng kiểm tra lại!');
            } else {
                if(req.body.username < 8) {
                    errors.push('Vui lòng nhập một tài khoản dài hơn');
                }
                if(req.body.password < 8) {
                    errors.push('Vui lòng nhập một mật khẩu dài hơn');
                }
                if(usernameAccount) {
                    errors.push('Tài khoản đã tồn tại');
                }
                if(emailAccount) {
                    errors.push('Email đã tồn tại');
                }
                if(phoneAccount) {
                    errors.push('Số điện thoại đã tồn tại');
                }
                if(req.body.password !== req.body.confirm) {
                    errors.push('Vui lòng xác nhận đúng mật khẩu');
                }
                if(!checkEmail(req.body.email)) {
                    errors.push('Vui lòng nhập đúng định dạng email');
                }
                if(!checkNumberPhone(req.body.phone)) {
                    errors.push('Vui lòng nhập đúng định dạng số điện thoại');
                }
                if(req.body.accept !== "on") {
                    errors.push('Vui lòng các nhận các yêu cầu trên là đúng');
                } 
            } 
            
            if(errors.length) {
                res.render('HomePage', {
                    errors: errors,
                    values: req.body
                });
                return;
            } else {
                await user.save((err, doc) => {
                    if(!err) {
                        res.render('HomePage');
                    }
                    else {
                        errors.push('Đăng ký thất bại !');
                    }  
                });
            }  
        } catch(err) {
            console.log('Register failed!!! ' + err);
        }
    },

    // Login
    loginUser: async(req, res) => {
        try {
            const errorsLogin = [];
            if(!req.body.usernameLogin ||
                !req.body.passwordLogin ) {
                errorsLogin.push('Bạn đã nhập thiếu thông tin, vui lòng kiểm tra lại!');
                console.log('Bạn đã nhập thiếu thông tin, vui lòng kiểm tra lại!');
            } else {
                const user = await User.findOne({ username: req.body.usernameLogin });
                if(!user) {
                    errorsLogin.push('Sai tài khoản đăng nhập');
                } else {
                    const validPassword = await bcrypt.compare(req.body.passwordLogin, user.password);
                    if(!validPassword) {
                        errorsLogin.push('Sai mật khẩu đăng nhập');
                    } else {
                        if(user && validPassword) {
                            req.session.isAuthenticated = true;
                            req.session.authUser = user;
                            res.redirect(`/thong-tin-ca-nhan/${user._id}`);
                        }
                    }
                }
            }

            if(errorsLogin.length) {
                res.render('HomePage', {
                    errorsLogin: errorsLogin,
                    valuesLogin: req.body
                });
                return;
            } 
        } catch(err) {
            console.log('Login failed!!! ' + err);
        }
    },

    // Update
    updateInfo: async(req, res) => {
        try {
            req.body.avatar = req.file.path;
            User.findOneAndUpdate({ _id : req.body._id }, req.body, {new: true}, (err, doc) => {
                if(!err) {
                    res.redirect(`/thong-tin-ca-nhan/${req.body._id}`);
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

module.exports = authController;