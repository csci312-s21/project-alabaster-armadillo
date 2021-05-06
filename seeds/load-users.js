const fs = require("fs");

exports.seed = function (knex) {
  const contents = fs.readFileSync("./data/seed.json");
  const data = JSON.parse(contents);

  // Deletes ALL existing entries
  return knex("panthers")
    .del()
    .then(() => knex.batchInsert("panthers", data, 100));
};