const express = require("express");
const exhbs = require("./config/hbs-registration");

const app = express();
exhbs.registration(app);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server is running: ", `http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
    res.render("index")
});

app.get("/about", (req, res) => {
    res.render("about")
});