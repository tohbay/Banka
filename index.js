
import chalk from 'chalk';
import Debug from 'debug';
import app from './app';

const debug = Debug('app');
const port = process.env.PORT || 3001;

app.listen(port, () => {
  debug(`API server started on port ${chalk.yellowBright(port)}`);
});
