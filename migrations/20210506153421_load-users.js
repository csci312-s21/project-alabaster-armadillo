exports.up = function (knex) {
  return knex.schema.createTable("panthers", (table) => {
    table.foreign("id").references("users.id").onDelete("CASCADE");
    table.string("firstName").notNullable();
    table.string("lastName").notNullable();
    table.string("email").unique().notNullable();
    table.text("post");
    table.string("postTime");
    table.string("postLikes");
    table.string("postReports");
    table.string("image").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("panthers");
};
