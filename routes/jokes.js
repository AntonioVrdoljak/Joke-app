const express = require("express")
const app = express()
const router = express.Router()

const authenticateToken = require("../middleware/authorization")
const fetchRandomJoke = require("../utils/fetchJoke")

app.use(express.json())

router.get("/", authenticateToken, async (req, res) => {
  try {
    const joke = await fetchRandomJoke()

    res.json({ joke })
  } catch (error) {
    console.error("Error fetching and sending joke:", error)
    res.status(500).json({ error: "An error occurred while fetching joke" })
  }
})

module.exports = router
