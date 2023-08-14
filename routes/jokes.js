const express = require("express")
const app = express()
const router = express.Router()

const authenticateToken = require("../middleware/authorization")
const fetchRandomJoke = require("../utils/fetchJoke")
const sendJokeByEmail = require("../utils/mailer")
const errorMessages = require("../messages/error-messages.json")

app.use(express.json())

router.get("/", authenticateToken, async (req, res) => {
  try {
    const joke = await fetchRandomJoke()

    sendJokeByEmail(req.user.email, joke)

    res.json({ joke })
  } catch (error) {
    console.error(errorMessages.fetchingJoke, error)
    res.status(500).json({ error: errorMessages.fetchingJoke })
  }
})

module.exports = router
