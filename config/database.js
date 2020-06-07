const mongoose = require("mongoose");
const keys = require("../keys");

async function start(cb) {
  try {
    await mongoose.connect(keys.MONGODB_URI, {
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
};
