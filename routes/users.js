const express = require("express")
const router = express.Router()
const app = express()

const bcrypt = require("bcrypt")
const generateToken = require("../utils/jwt")
const errorMessages = require("../messages/error-messages.json")
const infoMessages = require("../messages/info-messages.json")

app.use(express.json())

//Import User Schema
const User = require("../models/user")

//Fetch all Users from MongoDB
router.get("/", async (req, res) => {
  try {
    const users = await User.find().exec()

    if (!users) return res.status(404).json({ error: errorMessages.emptyDB })

    console.log(users)
    res.json(users)
  } catch (error) {
    console.error(errorMessages.retrievingUser, error)
    res.status(500).json({ error: errorMessages.retrievingUser })
  }
})

//Signin user
router.post("/signin", async (req, res) => {
  const { email, password, firstName, lastName } = req.body

  try {
    const existingUser = await User.findOne({ email }).exec()

    if (existingUser) {
      console.log(errorMessages.emailAlreadyExists)
      return res.status(400).json({ error: errorMessages.emailAlreadyExists })
    }
    if (!firstName || !lastName) {
      console.log(errorMessages.missingFields)
      return res.status(400).json({
        error: errorMessages.missingFields,
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
    const token = generateToken(savedUser)

    console.log(infoMessages.successfullyLogged)
    res.json(token)
  } catch (error) {
    console.error(errorMessages.createUser, error)
    res.status(500).json({ error: errorMessages.createUser })
  }
})

//Login user
router.post("/login", async (req, res) => {
  const users = await User.find().exec()

  if (!users) return res.status(404).json({ error: errorMessages.emptyDB })

  const user = users.find((user) => user.email == req.body.email)

  if (user == null) return res.status(400).send(errorMessages.noUser)

  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const token = generateToken(user)

      console.log(infoMessages.successfullyLogged)
      res.json(token)
    } else {
      console.log(errorMessages.notLoggedin)
      res.json(errorMessages.notAllowed)
    }
  } catch (error) {
    console.error(errorMessages.notLoggedin, error)
    res.status(500).json({ error: errorMessages.notAllowed })
  }
})

router.delete("/delete", async (req, res) => {
  const { email } = req.body

  try {
    const userToDelete = await User.findOne({ email }).exec()

    if (!userToDelete) return res.status(400).send(errorMessages.noUser)

    const deletedUser = await userToDelete.deleteOne({ email })

    console.log(infoMessages.userDeleted, deletedUser.email)
  } catch (error) {
    console.error(errorMessages.deleteUserFailed, error)
    res.status(500).json({ error: errorMessages.deleteUserFailed })
  }
})

module.exports = router
