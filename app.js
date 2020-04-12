const express = require("express");
const exhbs = require("./config/hbs-registration");
const homeRoutes = require("./routes/home");
const addRoutes = require("./routes/add");
const coursesRoutes = require("./routes/courses");
const cardRoutes = require("./routes/card");
const path = require("path");
require("dotenv").

const app = express();
exhbs.registration(app);

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({extended: true}));
app.use("/", homeRoutes);
app.use("/add", addRoutes);
app.use("/courses", coursesRoutes);
app.use("/card", cardRoutes);


const PORT = process.env.PORT || 8080;

const mongoConnectUrl = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-jkbxe.mongodb.net/test?retryWrites=true&w=majority`;
console.log(mongoConnectUrl);

app.listen(PORT, () => {
  console.log("Server is running: ", `http://localhost:${PORT}`);
});
