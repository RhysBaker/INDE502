module.exports =  {
  ensureAuthenticated: function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
      req.flash("error_msg", "your are not logged in")
      res.redirect("/account/signin")
    }
  }
}
