const { Router } = require("express");
const Order = require("../models/order");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find({ "user.userId": req.user._id }).populate("user.userId");
    res.render("orders", {
      isOrder: true,
      title: "Order",
      orders: orders.map(o => ({
        ...o.toObject(),
        price: o.courses.reduce((total, current) => total + (current.count * current.course.price), 0)
      })),
    })
  } catch (e) {
    console.log(e);
  }
})

router.post("/", async (req, res) => {
  try {
    const user = await req.user.populate("cart.items.courseId").execPopulate();

    const courses = user.cart.items.map(c => ({
      course: {...c.course.toObject()},
      count: c.count,
    }))

    const order = new Order({
      user: {
        name: req.user.name,
        userId: req.user,
      },
      courses,
    })

    await order.save();

    await req.user.clearCart();

    res.redirect("/orders")
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;

