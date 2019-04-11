
import chalk from 'chalk';
import debug from 'debug';
import app from './app';

// app.use(debug('app'));
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`API server started on port ${chalk.yellowBright(port)}`);
  // debug(`API server started on port ${chalk.yellowBright(port)}`);
});
