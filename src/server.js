const app = require('./app');

const { PORT } = process.env || 8080;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Press CTRL-C to stop\n');
});
