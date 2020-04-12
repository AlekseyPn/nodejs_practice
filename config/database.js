const mongoose = require("mongoose");

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-jkbxe.mongodb.net/shop`;

console.log(url);

async function start(cb) {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    cb();
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  mongoose,
  start,
};
