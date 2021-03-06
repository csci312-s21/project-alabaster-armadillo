exports.up = function (knex) {
  return knex.schema.createTable("panthers", (table) => {
    table.integer("user_id");
    table.string("firstName").notNullable();
    table.string("lastName").notNullable();
    table.text("post");
    table.integer("postTime");
    table.string("postLikes");
    table.string("postReports");
    table.string("image").notNullable();

    table.foreign("user_id").references("users.id").onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("panthers");
};
