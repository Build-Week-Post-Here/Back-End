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

async function updateRecs(recs, postid) {
  recs.forEach(async rec => {
    await db('recs')
      .where('id', rec.id)
      .update(rec)
  })
  return db('recs').where('post_id', postid)
}

function removeRecs(id) {
  return db('recs')
    .where('post_id', id)
    .del()
}
