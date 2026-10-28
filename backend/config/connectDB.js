const { Pool } = require('pg');

const requiredEnvironment = [
  'POSTGRES_HOST',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DB'
];
const missingEnvironment = requiredEnvironment.filter(
  (key) => !process.env[key]
);

if (missingEnvironment.length > 0) {
  throw new Error(
    `Missing required PostgreSQL environment variables: ${missingEnvironment.join(', ')}`
  );
}

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT || 5432),
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  max: 10, 
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000
});

module.exports = pool;
