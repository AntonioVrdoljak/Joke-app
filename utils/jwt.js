const jwt = require("jsonwebtoken")
require("dotenv").config()

function generateToken(user) {
  const payload = {
    userId: user.id,
    email: user.email,
  }

  const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30s",
  })

  return token
}
module.exports = generateToken
