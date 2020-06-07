const { body } =require("express-validator");
const User = require("../models/user");

exports.registerValidators = [
  body('email', "Enter correct email address")
    .isEmail()
    .custom(async (value) => {
      try {
        const user = await User.findOne({ email: value});
        if (user) {
          return Promise.reject("User with entered email is exist")
        }
        return Promise.resolve();
      } catch (e) {
        console.log(e);
      }
    })
    .normalizeEmail(),
  body('password', "Password must be at least 6 characters")
    .isLength({min: 6, max: 56})
    .isAlphanumeric()
    .trim(),
  body("confirm")
    .custom((value, {req}) => {
      if (value !== req.body.password) {
        throw new Error('Passwords must be same');
      }
      return true;
    })
    .trim(),
  body("name", "Name must be at least 3 characters").isLength({min: 3}).trim(),
];

exports.loginValidators = [
  body("email", "Enter correct email address")
    .isEmail()
    .custom(async (value) => {
      const candidate = await User.findOne({email: value});
      if (!candidate) {
        return Promise.reject("User with such email or password does not exist");
      }
      return Promise.resolve();
    }),
  body("password", "Password must be at least 3 characters").isLength({min: 3}),
];

exports.courseValidators = [
  body("title").isLength({min: 3}).withMessage("Course name has minimum length is 3 characters").trim(),
  body("price").isNumeric().withMessage("Enter correct price"),
  body("img", "Enter correct image url").isURL(),
]
