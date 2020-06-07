const keys = require("../keys");

module.exports = function (to) {
  return {
    to,
    from: keys.EMAIL_FROM,
    subject: "Account created",
    html: `
        <h1>Welcome to our shop</h1>
        <p>You success created account by email - ${to}</p>
        <hr>
        <a href="${keys.BASE_URL}">Start shopping</a>
    `
  }
}
