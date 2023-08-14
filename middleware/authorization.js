const jwt = require("jsonwebtoken")
const errorMessages = require("../messages/error-messages.json")
require("dotenv").config()

function authenticateToken(req, res, next) {
  const token = req.headers.authorization

  if (!token) return res.status(401).json({ error: errorMessages.unauthorized })

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: errorMessages.tokenFailed })
    }

    req.user = user
    next()
  })
}

module.exports = authenticateToken
