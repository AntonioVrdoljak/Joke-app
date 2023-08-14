const express = require("express")
const router = express.Router()
const app = express()

const bcrypt = require("bcrypt")

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

//Signin user
router.post("/signin", async (req, res) => {
  const { email, password, firstName, lastName } = req.body

  try {
    const existingUser = await User.findOne({ email }).exec()

    if (existingUser) {
      console.log("User with this email already exists.")
      return res
        .status(400)
        .json({ error: "User with this email already exists." })
    }
    if (!firstName || !lastName) {
      console.log(
        "Enter the user's first and last name to complete the process."
      )
      return res.status(400).json({
        error: "Enter the user's first and last name to complete the process.",
      })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    })

    const savedUser = await newUser.save()
  } catch (error) {
    console.error("Error creating user:", error)
    res.status(500).json({ error: "An error occurred while creating the user" })
  }
})

//Login user
router.post("/login", async (req, res) => {
  const users = await User.find().exec()

  if (!users) return res.status(404).json({ error: "MongoDB is empty." })

  const user = users.find((user) => user.email == req.body.email)

  if (user == null) return res.status(400).send("Cannot find user.")

  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      console.log("User successfully logged in.")
    } else {
      console.log("The user was not successfully logged in.")
      res.json("Not Allowed.")
    }
  } catch (error) {
    res.status(500).send()
  }
})

module.exports = router
