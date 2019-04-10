import express from 'express';


const app = express();

app.get('/api/v1', (request, response) => {
  response.status(200).send({
    message: 'Welcome to Banka API, your services at its best'
  });
});


export default app;
