const {nanoid} = require("nanoid");

const fs = require("fs");
const path = require("path");

class Course {
  constructor(title, price, img) {
    this.title = title;
    this.price = price;
    this.img = img;
    this.id = nanoid();
  }

  toModel() {
    return {title: this.title, price: this.price, img: this.img, id: this.id};
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(path.join(__dirname, "..", "data", "courses.json"), "utf-8", (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(JSON.parse(data))
        }
      })
    });
  }

  static async getById(id) {
    const courses = await Course.getAll();
    return courses.find(course => course.id === id)
  }

  static async update(course) {
    const courses = await Course.getAll();
    const idx = courses.findIndex(c => c.id === course.id);
    courses[idx] = course;

    return new Promise((resolve, reject) => {
      fs.writeFile(path.join(__dirname, "..", "data", "courses.json"), JSON.stringify(courses), err => {
        if (err) {
          reject(err);
        } else {
          resolve(courses)
        }
      })
    });
  }

  async save() {
    const courses = await Course.getAll();
    courses.push(this.toModel());
    return new Promise((resolve, reject) => {
      fs.writeFile(path.join(__dirname, "..", "data", "courses.json"), JSON.stringify(courses), err => {
        if (err) {
          reject(err);
        } else {
          resolve(courses)
        }
      })
    });
  }
}

module.exports = Course;
