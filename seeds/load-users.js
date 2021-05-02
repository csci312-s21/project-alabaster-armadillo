const fs = require("fs");

exports.seed = function (knex) {
  const contents = fs.readFileSync("./data/seed.json");
  const data = JSON.parse(contents);

  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(() => knex.batchInsert("users", data, 2));
};