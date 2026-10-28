require('dotenv').config();

const app = require('./app');

const port = Number(process.env.API_PORT || 5000);
const server = app.listen(port, () => {
  console.log(`JobCentral API listening on port ${port}`);
});

server.on('error', (error) => {
  console.error('Failed to start JobCentral API:', error);
  process.exitCode = 1;
});


