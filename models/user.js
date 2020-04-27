const { Schema, model } = require("mongoose")

const userSchema = new Schema({
 email: {
   type: String,
   required: true,
 },
 name: {
   type: String,
 },
 password: {
   type: String,
   required: true,
 },
 cart: {
   items: [{
     count: {
       type: Number,
       required: true,
       default: 1,
     },
     courseId: {
       type: Schema.Types.ObjectId,
       ref: "Course",
       required: true,
       alias: "course",
     }
   }]
 }
})

userSchema.methods.addToCart = function(course) {
  const items = [...this.cart.items];
  const courseIdx = items.findIndex(c => c.courseId.toString() === course._id.toString());
  if (courseIdx >= 0) {
    items[courseIdx].count = items[courseIdx].count + 1;
  } else {
    items.push({count: 1, courseId: course._id})
  }
  this.cart = { items };
  return this.save()
};

userSchema.methods.removeFromCart = function(courseId) {
  let items = [...this.cart.items];

  const courseIdx = items.findIndex(c => c.courseId.toString() === courseId.toString());

  if (items[courseIdx].count > 1) {
    items[courseIdx].count = items[courseIdx].count - 1;
  } else {
    items = items.filter(c => c.courseId.toString() !== courseId.toString());
  }

  this.cart = { items };
  return this.save();
}

userSchema.methods.clearCart = function() {
  this.cart.items = [];

  return this.save();
}

module.exports = model("User", userSchema)
