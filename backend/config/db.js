const knex = require("knex");
const { Model } = require("objection");

console.log("DB_HOST:", process.env.DB_HOST); // Should log correctly
console.log("DB_USER:", process.env.DB_USER); // Should log correctly
console.log("DB_PASS:", process.env.DB_PASS); // Should log correctly
console.log("DB_NAME:", process.env.DB_NAME); // Should log correctly

const knexConfig = {
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
};

const db = knex(knexConfig);
Model.knex(db);

module.exports = db;
