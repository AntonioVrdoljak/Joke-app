const express = require("express")
const router = express.Router()
const app = express()

app.use(express.json())

//Import User Schema
const User = require("../models/user")

//Fetch all Users from MongoDB
router.get("/", async (req, res) => {
  try {
    const users = await User.find().exec()

    if (!users) return res.status(404).json({ error: "MongoDB is empty." })

    console.log(users)
    res.json(users)
  } catch (error) {
    console.error("Error retrieving user:", error)
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the user" })
  }
})

module.exports = router
