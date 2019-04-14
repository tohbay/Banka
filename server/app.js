import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import userRoutes from './v1/routes/user';
import accountRoutes from './v1/routes/account';
import transactionRoutes from './v1/routes/transaction';

const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/v1', (request, response) => {
  response.status(200).send({
    message: 'Welcome to Banka API, your services at its best'
  });
});


app.use('/api/v1/auth/', userRoutes);
app.use('/api/v1/accounts/', accountRoutes);
app.use('/api/v1/transactions/', transactionRoutes);


export default app;
