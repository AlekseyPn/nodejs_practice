const mongoose = require("mongoose");

const MONGODB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-jkbxe.mongodb.net/shop`;

async function start(cb) {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    cb();
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  mongoose,
  start,
  MONGODB_URI,
};
