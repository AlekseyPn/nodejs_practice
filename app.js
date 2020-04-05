const express = require("express");
const exhbs = require("./config/hbs-registration");
const homeRoutes = require("./routes/home");
const addRoutes = require("./routes/add");
const coursesRoutes = require("./routes/courses");

const app = express();
exhbs.registration(app);

app.use(express.static("public"));

app.use(express.urlencoded({extended: true}));

app.use("/", homeRoutes);
app.use("/add", addRoutes);
app.use("/courses", coursesRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running: ", `http://localhost:${PORT}`);
});
