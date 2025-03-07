const Pool = require('pg').Pool;
require('dotenv').config();

// 1st option of having configs

const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

const proConfig = process.env.DATABASE_URL; //heroku addons

const pool = new Pool({
  connectionString:
    process.env.NODE_ENV === 'production' ? proConfig : devConfig,
  // Comment out in dev mode
  ssl: { rejectUnauthorized: false },
});

// 2nd option

// const config = {
//   user: process.env.PG_USER,
//   host: process.env.PG_HOST,
//   database: process.env.PG_DATABASE,
//   password: process.env.PG_PASSWORD,
//   port: process.env.PG_PORT,
// };
// const proConfig = {
//   connectionString: process.env.DATABASE_URL,
// };
// const pool = new Pool(
//   process.env.NODE_ENV === 'production' ? proConfig : config
// );

module.exports = pool;
