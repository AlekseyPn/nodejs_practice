const exhbs = require("express-handlebars");

module.exports = {
    registration(app) {
        const hbs = exhbs.create({
            defaultLayout: 'main',
            extname: "hbs"
        });

        app.engine("hbs", hbs.engine);
        app.set("view engine", 'hbs');
        // можем настроить любую другую папку для вьюх
        app.set("views", "views");
        return hbs;
    }
};