exports.isAdmin = (req, res, next) => {
    if (req.session.user == 'admin') {
        next()
    } else {
        res.redirect('/login');
    }
}
exports.isEmployee = (req, res, next) => {
    if (req.session.user == 'emp') {
        next()
    } else {
        res.redirect('/login');
    }
}