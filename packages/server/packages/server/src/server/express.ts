import express from 'express';

const app = express();
const port = process.env.PORT || 3100;

// define a route handler for the default home page
app.get('/', (req, res) => {
  res.send('Hello, Express.js!');
});

app.use((err, req, res, next) => {
  console.error(err.message); // Log error message in our server's console
  if (!err.statusCode) {
    err.statusCode = 500;
  } // If err has no specified error code, set error code to 'Internal Server Error (500)'
  res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
