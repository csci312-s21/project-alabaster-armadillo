exports.up = function (knex) {
  return knex.schema.createTable("panthers", (table) => {
    table.increments("id");
    table.string("firstName").notNullable();
    table.string("lastName").notNullable();
    table.string("email").unique().notNullable();
    table.text("post");
    table.string("image").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("panthers");
};
