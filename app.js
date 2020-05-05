require("dotenv").config();
const path = require("path");
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");
const flash = require("connect-flash");
const homeRoutes = require("./routes/home");
const addRoutes = require("./routes/add");
const coursesRoutes = require("./routes/courses");
const cartRoutes = require("./routes/cart");
const ordersRoutes = require("./routes/orders");
const authRoutes = require("./routes/auth");
const db = require("./config/database");
const varMiddleware = require("./middleware/variables");
const userMiddleware = require("./middleware/user");

const app = express();
require("./config/hbs-registration").registration(app);

const store = new MongoStore({
  collection: "sessions",
  uri: db.MONGODB_URI,
})

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(session({
  secret: "secret Key Value",
  resave: false,
  saveUninitialized: false,
  store,
}));
app.use(csrf());
app.use(flash());
app.use(varMiddleware);
app.use(userMiddleware);
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

