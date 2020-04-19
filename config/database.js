const mongoose = require("mongoose");
const User = require("../models/user");

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-jkbxe.mongodb.net/shop`;

async function start(cb) {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    const candidate = await User.findOne();
    if (!candidate) {
      const user = new User({email: "aleksfers@icloud.com", name: "Alex", cart: {items:[]}})
      await user.save();
    }
    cb();
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  mongoose,
  start,
};
