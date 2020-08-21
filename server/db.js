const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "root",
  host: "localhost",
  database: "pernstackdb",
  port: 5432,
});

module.exports = pool;
