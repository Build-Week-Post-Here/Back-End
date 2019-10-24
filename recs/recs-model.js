const db = require('../database/dbConfig')

module.exports = {
  findRecsByPostId,
  saveRecs
}

function findRecsByPostId(id) {
  return db('recs as r')
    .join('posts as p')
    .select('r.id', 'r.subreddit', 'r.score')
    .where(id, '=', 'r.post_id')
}

async function saveRecs(entry) {
  await db('recs').insert(
    entry.rec1
    ,entry.rec2
    ,entry.rec3
    ,entry.rec4
    ,entry.rec5
  )
  return db('recs').where('post_id', entry.post.user_id )
}
