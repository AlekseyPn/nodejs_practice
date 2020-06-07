const {Router} = require("express");
const bcrypt = require("bcryptjs");
const sgMail = require('@sendgrid/mail');
const crypto = require("crypto");
const User = require("../models/user");
const regEmail = require("../emails/registration");
const resetEmail = require("../emails/reset");

const router = Router();

router.get("/login", async (req, res) => {
  res.render("auth/login", {
    isLogin: true,
    title: "Authorization",
    loginError: req.flash("loginError"),
    registerError: req.flash("registerError"),
    success: req.flash("success"),
  })
})

router.get("/logout", async (req, res) => {
  req.session.destroy(() => {
    res.redirect("/auth/login#login");
  });
})

router.post("/login", async (req, res) => {
  try {
    const {email, password} = req.body;
    const candidate = await User.findOne({email});
    if (candidate) {
      const areSame = await bcrypt.compare(password, candidate.password);
      if (areSame) {
        req.session.user = candidate;
        req.session.isAuthenticated = true;
        req.session.save(err => {
          if (err) {
            throw err
          }
          res.redirect("/");
        })
      } else {
        req.flash("loginError", "Password is incorrect");
        res.redirect("/auth/login#login");
      }
    } else {
      req.flash("loginError", "That user does't exist");
      res.redirect("/auth/login#login");
    }
  } catch (e) {
    console.log(e);
  }
});

router.post("/register", async (req, res) => {
  try {
    const {email, password, repeat, name} = req.body;
    const candidate = await User.findOne({email})
    if (candidate) {
      req.flash("registerError", "User with entered email is exist");
      res.redirect("/auth/login#register");
    } else {
      const hashPassword = await bcrypt.hash(password, 10)
      const user = new User({email, name, password: hashPassword, cart: {items: []}});
      await user.save();
      res.redirect("/auth/login#login");
      await sgMail.send(regEmail(email));
    }
  } catch (e) {
    console.log(e.response.body);
  }
})

router.get("/reset", (req, res) => {
  res.render("auth/reset", {
    title: "Forgot password",
    error: req.flash("error")
  })
})

router.post("/reset", (req, res) => {
  try {
    crypto.randomBytes(32, async (err, buffer) => {
      if (err) {
        req.flash("error", "Something went wrong, trying later");
        return res.redirect("/auth/reset");
      }

      const token = buffer.toString("hex");

      const candidate = await User.findOne({email: req.body.email})

      if (candidate) {
        candidate.resetToken = token;
        candidate.resetTokenExp = Date.now() + 60 * 60 * 1000;
        await candidate.save();
        await sgMail.send(resetEmail(candidate.email, token));
        res.redirect("/auth/login");
      } else {
        req.flash("error", "User by email not found")
        res.redirect("/auth/reset");
      }
    });
  } catch (e) {
    console.log(e)
  }
})

router.get("/password/:token", async (req, res) => {
  if (!req.params.token) {
    return res.redirect("/auth/login");
  }
  try {
    const user = await User.findOne({
      resetToken: req.params.token,
      resetTokenExp: {$gt: Date.now()}
    });

    if (!user) {
      return res.redirect("/auth/login");
    } else {
      res.render("auth/password", {
        title: "Recover access",
        error: req.flash("error"),
        userId: user._id.toString(),
        token: req.params.token,
      });
    }
  } catch (e) {
    console.log(e);
  }
})

router.post("/password", async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.body.userId,
      resetToken: req.body.token,
      resetTokenExp: {
        $gt: Date.now(),
      }
    })
    if (user) {
      user.password = await bcrypt.hash(req.body.password, 10);
      user.resetToken = null;
      user.resetTokenExp = null;
      await user.save();
      req.flash("success", "Your password were reset, try to login");
      res.redirect("/auth/login")
    } else {
      req.flash("loginError", "Time for to reset password is expired, try one more time")
      res.redirect("/auth/login")
    }
  } catch (e) {
    console.log(e)
  }
})

module.exports = router;
