require("dotenv").config();
const {
  DATABASE_NAME,
  DATABASE_USER_NAME,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DIALECT,
  DB_PORT,
} = process.env;

module.exports = {
  development: {
    username: DATABASE_USER_NAME,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    host: DATABASE_HOST,
    dialect: DIALECT,
    port: DB_PORT,
  },
  production: {
    username: DATABASE_USER_NAME,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    host: DATABASE_HOST,
    dialect: DIALECT,
    port: DB_PORT,
  },
};
