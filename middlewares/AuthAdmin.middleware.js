module.exports = function (req, res, next) {
    if(!req.session.isAuthenticatedAdmin) {
        return res.redirect('/admin');
    }
    next();
}

