const nodemailer = require("nodemailer")
const senderEmail = "chucknorris@joke.hr"

async function createTestTransporter() {
  const testAccount = await nodemailer.createTestAccount()

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  })

  return transporter
}

// Function to send joke by email
async function sendJokeByEmail(email, joke) {
  const transporter = await createTestTransporter()

  const mailOptions = {
    from: senderEmail,
    to: email,
    subject: "Chuck Norris Joke",
    text: joke,
  }
  const info = await transporter.sendMail(mailOptions)

  console.log(
    "Check the user's email at the URL:",
    nodemailer.getTestMessageUrl(info)
  )
}

module.exports = sendJokeByEmail
