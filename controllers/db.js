const { Pool } = require('pg');

// Set up the PostgreSQL connection pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Export the query method to execute database queries
module.exports = {
  query: (text, params) => pool.query(text, params),
};
