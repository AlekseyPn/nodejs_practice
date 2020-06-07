const { Router } = require("express");
const {validationResult} = require("express-validator");
const Course = require("../models/course");
const auth = require("../middleware/auth");
const {courseValidators} = require("../utils/validators");
const router = Router();

router.get("/", auth, (req, res) => {
  res.render("add", {
    title: "Add course",
    isAdd: true,
  })
});

router.post("/", auth, courseValidators, async (req, res) => {
  const { body } = req;
  const course = new Course({...body, userId: req.user});

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const [error] = errors.array()
    return res.status(422).render("add", {
      title: "Add course",
      isAdd: true,
      error: error.msg,
      data: body
    })
  }
  try {
    await course.save();
    res.redirect("/courses");
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
