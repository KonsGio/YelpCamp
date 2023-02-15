module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.flash('error', 'You must log in first!');
        return res.redirect('/login');
    }
    next();
}