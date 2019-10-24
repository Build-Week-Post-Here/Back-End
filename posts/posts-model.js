const db = require('../database/dbConfig.js')

module.exports = {
  findAllPosts,
  findPostById,
  findBy,
  add,
  update,
  remove
}

function findAllPosts(id) {
  return db('posts as p')
    .join('users as u', 'u.id', 'p.user_id')
    .select(
      'p.id',
      'p.title',
      'p.content',
      'p.created_at',
      'p.updated_at',
      'p.tags',
      'p.post_img',
      'p.user_id'
    )
    .where('u.id', id)
}

function findPostById(id) {
  return db('posts')
    .where({ id })
    .first()
}

function findBy(filter) {
  return db('posts')
    .where(filter)
    .first()
}

async function add(entry) {
  const [id] = await db('posts').insert(entry.post)

  return db('posts')
    .where({ id })
    .first()
}

async function update(id, changes) {
  await db('posts')
    .where({ id })
    .update(changes)
  return db('posts')
    .where({ id })
    .first()
}

function remove(id) {
  return db('posts')
    .where({ id })
    .del()
}
