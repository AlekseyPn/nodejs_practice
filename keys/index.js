module.exports = {
  MONGODB_URI: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-jkbxe.mongodb.net/shop`,
  SESSION_SECRET: process.env.SESSION_SECRET_KEY,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  EMAIL_FROM: process.env.EMAIL_FROM,
  BASE_URL: process.env.BASE_URL,
}
