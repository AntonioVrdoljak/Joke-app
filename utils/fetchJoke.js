const axios = require("axios")
const errorMessages = require("../messages/error-messages.json")

async function fetchRandomJoke() {
  try {
    const response = await axios.get("https://api.chucknorris.io/jokes/random")
    return response.data.value
  } catch (error) {
    console.error(errorMessages.fetchRndJokeFail, error)
    return null
  }
}

module.exports = fetchRandomJoke
