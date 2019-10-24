exports.up = function(knex) {
  return knex.schema.createTable('recs', tbl => {
    tbl.increments()
    tbl.string('subreddit', 255)
    tbl.integer('score')
    tbl
      .integer('post_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('posts')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('recs')
};
