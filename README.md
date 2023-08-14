# Chuck Norris Joke Fetcher

This is a Node.js application that allows users to sign up, log in, and fetch random Chuck Norris jokes.
The fetched jokes are sent to the logged-in users via email. 
The application is built using JavaScript, Express for the REST API, JWT for authentication, and Nodemailer for email sending.

## Features

- User Sign Up: Users can create an account by providing their email, password, first name, and last name.

- User Log In: Users can log in with their credentials to access the joke-fetching endpoint.

- Fetch Jokes: Authenticated users can fetch a random Chuck Norris joke from the Chuck Norris API (https://api.chucknorris.io/).

- Email Sending: Fetched jokes are sent to the user's email address using Nodemailer. For testing purposes, we use the Ethereal email service.

## Setup

1. Clone the repository:
   ```sh
   git clone git@github.com:AntonioVrdoljak/Joke-app.git
   cd Joke-app
   ```
2. Install dependencies:
    ```
    npm install
    ```
3. Set up environment variables:
      - Copy the .env.example to your .env file

      ```
      .env
        
      PORT = 3000
      DB_URL_CONNECTION = mongodb+srv://tonivrdoljak165:admin@chucknorriscluster.dnhncys.mongodb.net/?retryWrites=true&w=majority
      ACCESS_TOKEN_SECRET = a718ec6231b2877724bfc3e9e80a48876336a768b422798c576310f269b20a42fca2517d8dad16ec23dbcdec3239847b9d563a3598cda50523d09d1d681e70c2
      ```
4. Start the server:
     ```
     npm start
     ```

## Testing API Endpoints

### Using REST Client (Visual Studio Code Extension)

1. **Install the REST Client extension**

2. **Create a REST Client Request File or use an existing one "request.rest"**

3. **Write API Requests**


## Technologies Used
- Node.js
- JavaScript
- Express
- JWT (JSON Web Tokens)
- Nodemailer (with Ethereal for email testing)
- MongoDB
   

  



