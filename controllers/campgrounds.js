const Campground = require('../models/campground');

module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds});
}

module.exports.renderNewForm = (req, res) => {
    res.render('campgrounds/new');
}

module.exports.createCampground = async (req, res, next) => {
    // if(!req.body.campground) throw new ExpressError('Incomplete Campground Data', 400);
    
    const campground = new Campground(req.body.campground);
    // Requesting files from campground model -> path and filename (multer)
    campground.images = req.files.map(f => ({
        url: f.path,
        filename: f.filename
    }))
    // Holding in the author id
    campground.author = req.user._id;
    await campground.save();
    // Flash success message
        req.flash('success',`${campground.title} successfully created!`)
        res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.showCampground = async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate({
        path:'reviews',
                populate:{
                    path:'author'
                }
            }).populate('author');
    if(!campground){
        req.flash('error','Campground does not exist!')
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', {campground});
}

module.exports.editCampground = async (req, res) => {
    const {id} = req.params;
    const campground = await Campground.findById(id);
    if(!campground){
        req.flash('error','Campground does not exist!')
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', {campground});
}

module.exports.updateCampground = async (req, res) => {
    const {id} = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground});
    const imgs = req.files.map(f => ({
        url: f.path,
        filename: f.filename
    }))
    campground.images.push(...imgs);
    await campground.save();
    if(req.body.deleteImages){    
        await campground.updateOne({$pull: {images: {filename: {$in: req.body.deleteImages}}}
        })
    }
    req.flash('success',`${campground.title} successfully updated!`)
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.deleteCampground = async (req, res) => {
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success','Campground successfully deleted!')
    res.redirect('/campgrounds');
}