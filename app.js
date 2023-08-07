const express = require('express')
const app = express()
const port = 3000

// Route for the homepage
app.get('/', (req, res) => {
  res.send('Homepage!!!')
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
});
