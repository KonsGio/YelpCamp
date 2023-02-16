module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        
        // Storing URL before logging in
        req.session.returnTo = req.originalUrl;

        req.flash('error', 'You must log in first!');
        return res.redirect('/login');
    }
    next();
}

// Middleware function to use JOI anywhere adding it to function as such (validateCampground, catchAsync)
module.exports.validateCampground = (req, res, next) => {
    const {error} = campgroundSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    }else{
        next();
    }
}

// Middleware for author verification
module.exports.isAuthor = async (req, res, next) => {
    const {id} = req.params;
    const campground = await Campground.findById(id);
    if (!campground.author.equals(req.user._id)){
        req.flash('error','You do not have permission to edit this Campground, you are NOT the author!');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}