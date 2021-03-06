exports.up = function(knex) {
  return knex.schema.createTable('posts', (tbl) => {
    tbl.increments()
    tbl.string('title', 255).notNullable()
    tbl.string('content')
    tbl.timestamps(true, true)
    tbl.string('tags')
    tbl.string('post_img')
    tbl
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('posts')
}
