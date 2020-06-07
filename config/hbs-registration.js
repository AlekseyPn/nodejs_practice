const exhbs = require("express-handlebars");

module.exports = {
  registration(app) {
    const hbs = exhbs.create({
      defaultLayout: "main",
      extname: "hbs",
      helpers: require("../utils/hbs-helpers"),
    });

    // hack for mongoose object
    hbs._renderTemplate = function (template, context, options) {
      options.allowProtoMethodsByDefault = true;
      options.allowProtoPropertiesByDefault = true;
      return template(context, options);
    };

    app.engine("hbs", hbs.engine);
    app.set("view engine", "hbs");
    // можем настроить любую другую папку для вьюх
    app.set("views", "views");
    return hbs;
  }
};
