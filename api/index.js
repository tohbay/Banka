import app from './app';

const { PORT = 3001 } = process.env;

app.listen(PORT, () => {
  console.log(`API server started at ${PORT}`);
});
