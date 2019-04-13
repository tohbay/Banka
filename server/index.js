
import chalk from 'chalk';
import Debug from 'debug';
import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const debug = Debug('app');
const port = process.env.PORT || 3001;

app.listen(port, () => {
  debug(`API server started on port ${chalk.yellowBright(port)}`);
});
