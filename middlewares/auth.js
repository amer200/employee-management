exports.isAdmin = (req, res, next) => {
    if (req.session.user == 'admin') {
        next()
    } else {
        res.redirect('/login');
    }
}