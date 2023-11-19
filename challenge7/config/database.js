const {
  DB_USER = "postgres",
  DB_PASSWORD = "2BE56D1BDBcGd2D*G5af2d31EG5gf36*",
  DB_NAME = "railway",
  DB_HOST = "roundhouse.proxy.rlwy.net",
  DB_PORT = "50011",
} = process.env;

module.exports = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: "postgres",
  },
  test: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: "postgres",
  },
  production: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: "postgres",
  },
};
