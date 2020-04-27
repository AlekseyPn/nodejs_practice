const { Router } = require("express");
const Course = require("../models/course");
const auth = require("../middleware/auth");

const router = Router();

router.get("/", auth, (req, res) => {
  res.render("add", {
    title: "Add course",
    isAdd: true,
  })
});

router.post("/", auth, async (req, res) => {
  const { body } = req;
  const course = new Course({...body, userId: req.user});
  try {
    await course.save();
    res.redirect("/courses");
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
