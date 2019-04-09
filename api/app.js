import express from 'express';


const app = express();

app.get('/', (request, response) => {
  response.status(200).send({
    message: 'Welcome to Banka API, your services at its best'
  });
});


export default app;
