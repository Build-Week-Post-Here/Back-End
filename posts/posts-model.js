const db = require('../database/dbConfig.js')

module.exports = {
  findAll,
  findById,
  findBy,
  add,
  update,
  remove
}

function findAll() {
  return db('posts')
}

function findById(id) {
  return db('posts')
    .where({ id })
    .first()
}

function findBy(filter) {
  return db('posts')
    .where(filter)
    .first()
}

async function add(post) {
  const [id] = await db('posts').insert(post, 'id')

  return db('posts')
    .where({ id })
    .first()
}

function update(id, changes) {
  return db('posts')
    .where({ id })
    .update(changes)
    .then((id) => {
      return db('posts')
        .where({ id })
        .first()
    })
}

function remove(id) {
  return db('posts')
    .where({ id })
    .del()
}
