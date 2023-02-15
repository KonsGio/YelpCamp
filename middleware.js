module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        
        // Storing URL before logging in
        req.session.returnTo = req.originalUrl;

        req.flash('error', 'You must log in first!');
        return res.redirect('/login');
    }
    next();
}