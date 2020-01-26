// const userSchema = require('../models/userModel');
module.exports = {
    checkLoginHome: function(req, res, next) {
        var session = req.session;
        if (session.userSchema != null) {
            next();
        } else
            res.redirect("/login");
    },
    checkLoginIndex: function(req, res, next) {
        var session = req.session;
        if (session.userSchema != null) {
            res.redirect("Dashboard/");
        } else
            next();
    }
}