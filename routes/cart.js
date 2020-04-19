const { Router } = require("express");
const router = Router();
const Course = require("../models/course");

function mapCartItems(cart) {
  return cart.items.map(c => ({
    ...c.course.toObject(),
    id: c.course.id,
    count: c.count,
  }))
}

function computePrice(courses) {
  return courses.reduce((total, current) => total + (current.count * current.price), 0);
}

router.post("/add", async (req, res) => {
  const course = await Course.findById(req.body.id);
  await req.user.addToCart(course);
  res.redirect("/cart")
});

router.get("/", async (req, res) => {
  const user = await req.user.populate("cart.items.courseId").execPopulate();

  const courses = mapCartItems(user.cart)

  res.render("cart", {
    title: "Cart",
    isCart: true,
    courses,
    price: computePrice(courses),
  })
});

router.delete("/remove/:id", async (req, res) => {
  await req.user.removeFromCart(req.params.id)

  const user = await req.user.populate("cart.items.courseId").execPopulate();
  const courses = mapCartItems(user.cart);

  res.status(200).json({
    courses,
    price: computePrice(courses),
  })
});

module.exports = router;
