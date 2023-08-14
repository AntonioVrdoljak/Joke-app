require("dotenv").config()

const express = require("express")
const app = express()

//Connect MongoDB
const mongoose = require("mongoose")

//Import Routes
const userRoute = require("./routes/users")

//Middleware
app.use(express.json())
app.use("/users", userRoute)

//Connect to MongoDB
async function connectMongoDB() {
  try {
    await mongoose.connect(process.env.DB_URL_CONNECTION)
    console.log("Connected to MongoDB")

    // Start the server
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on http://localhost:${process.env.PORT}`)
    })
  } catch (error) {
    console.error(error)
  }
}

connectMongoDB()
