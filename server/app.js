import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import indexRoutes from './v1/routes/index';

const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.status(200).send({
    message: 'Welcome to Banka API, your services at its best'
  });
});

app.use('/api/v1/', indexRoutes);

export default app;
