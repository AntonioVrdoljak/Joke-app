const axios = require("axios")

async function fetchRandomJoke() {
  try {
    const response = await axios.get("https://api.chucknorris.io/jokes/random")
    return response.data.value
  } catch (error) {
    console.error("Error fetching random joke:", error)
    return null
  }
}

module.exports = fetchRandomJoke
