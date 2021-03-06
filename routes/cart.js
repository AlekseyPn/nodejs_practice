const { Router } = require("express");
const Course = require("../models/course");
const auth = require("../middleware/auth");

const router = Router();

function mapCartItems(cart) {
  return cart.items.map(c => ({
    ...c.courseId.toObject(),
    id: c.course.id,
    count: c.count,
  }))
}

function computePrice(courses) {
  return courses.reduce((total, current) => total + (current.count * current.price), 0);
}

router.post("/add", auth, async (req, res) => {
  const course = await Course.findById(req.body.id);
  await req.user.addToCart(course);
  res.redirect("/cart")
});

router.get("/", auth, async (req, res) => {
  let courses = []
  try {
    const user = await req.user.populate("cart.items.courseId").execPopulate();
    courses = mapCartItems(user.cart)
  } catch (e) {
    courses = []
  }

  res.render("cart", {
    title: "Cart",
    isCart: true,
    courses,
    price: computePrice(courses),
  })
});

router.delete("/remove/:id", auth, async (req, res) => {
  await req.user.removeFromCart(req.params.id)

  const user = await req.user.populate("cart.items.courseId").execPopulate();
  const courses = mapCartItems(user.cart);

  res.status(200).json({
    courses,
    price: computePrice(courses),
  })
});

module.exports = router;
