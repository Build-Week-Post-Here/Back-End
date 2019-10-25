const db = require('../database/dbConfig')

module.exports = {
  findRecsByPostId,
  saveRecs,
  updateRecs,
  removeRecs
}

function findRecsByPostId(id) {
  return db('recs as r')
    .join('posts as p')
    .select('r.id', 'r.subreddit', 'r.score')
    .where(id, '=', 'r.post_id')
}

async function saveRecs(entry) {
  entry.recs.forEach(async rec => {
    await db('recs').insert(rec)
  })
  return db('recs').where('post_id', entry.recs[0].post_id)
}

async function updateRecs(changes, postid) {
  await db('recs')
    .where('id', changes.rec1.id)
    .update(changes.rec1)
  await db('recs')
    .where('id', changes.rec2.id)
    .update(changes.rec2)
  await db('recs')
    .where('id', changes.rec3.id)
    .update(changes.rec3)
  await db('recs')
    .where('id', changes.rec4.id)
    .update(changes.rec4)
  await db('recs')
    .where('id', changes.rec5.id)
    .update(changes.rec5)

  return db('recs').where('post_id', postid)
}

function removeRecs(id) {
  return db('recs')
    .where('post_id', id)
    .del()
}
