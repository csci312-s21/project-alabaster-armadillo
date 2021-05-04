const fs = require("fs");


exports.seed = async function(knex) {
  const contents = fs.readFileSync("./data/test-data.json");
  const data = JSON.parse(contents);
  // Deletes ALL existing entries
  await knex("panthers").del();
  // load in the sample articles
  await knex.batchInsert("panthers", data, 2);
};
