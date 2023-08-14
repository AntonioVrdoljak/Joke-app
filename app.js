require("dotenv").config()

const express = require("express")
const app = express()

const infoMessages = require("./messages/info-messages.json")

//Connect MongoDB
const mongoose = require("mongoose")

//Import Routes
const userRoute = require("./routes/users")
const jokeRoute = require("./routes/jokes")

//Middleware
app.use(express.json())
app.use("/users", userRoute)
app.use("/fetch-joke", jokeRoute)

//Connect to MongoDB
async function connectMongoDB() {
  try {
    await mongoose.connect(process.env.DB_URL_CONNECTION)
    console.log(infoMessages.dbConnected)

    // Start the server
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on http://localhost:${process.env.PORT}`)
    })
  } catch (error) {
    console.error(error)
  }
}

connectMongoDB()
