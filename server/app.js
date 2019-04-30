import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

import indexRoutes2 from './v2/routes/index';

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (request, response) => {
  response.status(200).send({
    message: 'Welcome to Banka API, your services at its best'
  });
});

app.use(indexRoutes2);

export default app;
