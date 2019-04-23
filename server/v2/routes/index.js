import express from 'express';
import UsersRoutes from './users';
import AccountsRoutes from './accounts';
import TransactionsRoutes from './transactions';

const app = express();

app.use('/api/v2/', UsersRoutes);
app.use('/api/v2/', AccountsRoutes);
app.use('/api/v2/', TransactionsRoutes);


export default app;
