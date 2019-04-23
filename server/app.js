import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import indexRoutes from './v1/routes/index';
import indexRoutes2 from './v2/routes/index';

const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.status(200).send({
    message: 'Welcome to Banka API, your services at its best'
  });
});

app.use(indexRoutes);
app.use(indexRoutes2);

export default app;
