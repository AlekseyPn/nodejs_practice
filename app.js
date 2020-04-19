require("dotenv").config();
const express = require("express");
const session = require("express-session");
const homeRoutes = require("./routes/home");
const addRoutes = require("./routes/add");
const coursesRoutes = require("./routes/courses");
const cartRoutes = require("./routes/cart");
const ordersRoutes = require("./routes/orders");
const authRoutes = require("./routes/auth");
const path = require("path");
const db = require("./config/database");
const User = require("./models/user");
const varMiddleware = require("./middleware/variables");

const app = express();
require("./config/hbs-registration").registration(app);

app.use(async (req, res, next) => {
  try {
    const user = await User.findById("5e9c2793eeef298ada9f7756");
    req.user = user;
    next();
  } catch (e) {
    console.log(e)
  }
})

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(session({
  secret: "secret Key Value",
  resave: false,
  saveUninitialized: false,
}));
app.use(varMiddleware);
app.use("/", homeRoutes);
app.use("/add", addRoutes);
app.use("/courses", coursesRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", ordersRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 8080;

db.start(() => {
  app.listen(PORT, () => {
    console.log("Server is running: ", `http://localhost:${PORT}`);
  });
});

