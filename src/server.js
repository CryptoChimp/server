const app = require('./app');

const { PORT } = process.env || 8080;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} on http://localhost:${PORT}`,
  );
  console.log('Press CTRL-C to stop\n');
});
