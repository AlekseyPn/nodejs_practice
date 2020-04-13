require("dotenv").config();
const express = require("express");
const homeRoutes = require("./routes/home");
const addRoutes = require("./routes/add");
const coursesRoutes = require("./routes/courses");
const cardRoutes = require("./routes/card");
const path = require("path");
const db = require("./config/database");

const app = express();
require("./config/hbs-registration").registration(app);

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({extended: true}));
app.use("/", homeRoutes);
app.use("/add", addRoutes);
app.use("/courses", coursesRoutes);
app.use("/card", cardRoutes);


const PORT = process.env.PORT || 8080;

db.start(() => {
  app.listen(PORT, () => {
    console.log("Server is running: ", `http://localhost:${PORT}`);
  });
});

