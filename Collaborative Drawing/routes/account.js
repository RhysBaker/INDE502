const express = require("express");
const router = express.Router();
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const passport = require("passport");


router.get("/signup", (req, res) =>{
  res.render("signup");
});

router.post("/signup", (req, res) =>{
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  let errorMsgs = [];

  if(!firstName || !lastName || !email || !password || !confirmPassword ) {
    errorMsgs.push({ msg: "Enter all fields" })
  }

  if(password != confirmPassword) {
    errorMsgs.push({ msg: "passwords do not match" })
  }

  if(password.length < 3) {
    errorMsgs.push({ msg: "password is too short(min 3 char)" })
  }

  if(errorMsgs.length > 0){
    res.render("signup", {
      errorMsgs,
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    });
  } else {
    User.findOne ({ email: email })
      .then(user => {
        if(user) {
          errorMsgs.push({ msg: "user already exists" });
          res.render("signup", {
            errorMsgs,
            firstName,
            lastName,
            email,
            password,
            confirmPassword
          });
        } else {
          const newUser = new User({
            firstName,
            lastName,
            email,
            password
          });

          bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser.save()
                .then(user => {
                  req.flash("success_msg", "thanks for registering!")
                  res.redirect("/account/signin");
                })
                .catch(err => console.log(err));
            }
          ))
          }//end of else
      })
    }
});

router.get("/signin", (req, res) =>{
  res.render("signin");
});



router.post("/signin", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/account/signin",
    failureFlash: true
  })(req, res, next)
})


module.exports = router;
