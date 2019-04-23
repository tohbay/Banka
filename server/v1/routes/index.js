import express from 'express';
import UsersRoute from './users';
import AccountsRoute from './accounts';
import TransactionRoutes from './transactions';

const app = express();

app.use('/api/v1/', UsersRoute);
app.use('/api/v1/', AccountsRoute);
app.use('/api/v1/', TransactionRoutes);

export default app;