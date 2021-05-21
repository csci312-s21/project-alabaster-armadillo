
exports.up = function (knex) {
  return knex.schema.createTable("posts", (table) => {
    table.increments("id");
    table.string("firstName").notNullable();
    table.string("lastName").notNullable();
    table.text("contents")
    table.text("timestamp")
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("posts");
};

