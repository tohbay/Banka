import app from './app';

const { PORT = 3001 } = process.env;

app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});
