import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import userRoutes from './v1/routes/user';

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/v1', (request, response) => {
  response.status(200).send({
    message: 'Welcome to Banka API, your services at its best'
  });
});


app.use('/api/v1/auth/', userRoutes);


export default app;
