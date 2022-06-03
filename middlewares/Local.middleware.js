module.exports = function(app) {
    app.use(function(req, res, next) {
        if(req.session.isAuthenticated === null) {
          req.session.isAuthenticated = false;
        }
        res.locals.lcIsAuthenticated = req.session.isAuthenticated;
        res.locals.lcAuthUser = req.session.authUser;
        next();
    });

    app.use(function(req, res, next) {
      if(req.session.isAuthenticatedAdmin === null) {
        req.session.isAuthenticatedAdmin = false;
      }
      res.locals.lcIsAuthenticatedAdmin = req.session.isAuthenticatedAdmin;
      res.locals.lcAuthAdmin = req.session.authAdmin;
      next();
  });
}