const keys = require("../keys");

module.exports = function (email, token) {
  return {
    to: email,
    from: keys.EMAIL_FROM,
    subject: "Password recovery",
    html: `
        <h1>You forgot password</h1>
        <p>If not, please ignore this email</p>
        <p>Otherwise click by link</p>
        <p> <a target="_blank" href="${keys.BASE_URL}/auth/password/${token}">Reset password</a></p>
        <hr>
        <a target="_blank" href="${keys.BASE_URL}">Start shopping</a>
    `
  }
}
