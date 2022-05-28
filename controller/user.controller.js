const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../model/user.model');
const validator = require("email-validator");
validator.validate("test@email.com");
 
const userController = {
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
                email: req.body.email,
                phone: req.body.phone,
                address: ""
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
                    errors.push("Vui lòng các nhận các yêu cầu trên là đúng");
                } 
            } 
            
            if(errors.length > 0) {
                res.render('HomePage', {
                    errors: errors,
                    values: req.body
                })
                return;
            } else {
                await user.save((err, doc) => {
                    if(!err) {
                        res.redirect('/');
                    }
                    else    
                    errors.push('Đăng ký thất bại !');
                });
            }  
        } 
        catch(err) {
            console.log('Register failed!!! ' + err);
        }
    },
    // Login
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

    var parts = mail.split("@");
    if(parts[0].length>64)
        return false;

    var domainParts = parts[1].split(".");
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

module.exports = userController;