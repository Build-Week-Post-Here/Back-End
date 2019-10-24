const router = require('express').Router()
const Recs = require('./recs-model')
// const Posts = require('../post/posts-model')


// GET /api/recs/:postid - get a specific users posts
router.get('/:postid', (req, res) => {
  const { postid } = req.params
  Recs.findRecsByPostId(postid)
    .then((recs) => {
      console.log('recs:', recs)
      res.status(200).json(recs)
    })
    .catch((err) => {
      res.status(500).json({ message: 'error finding recs' })
    })
})

// GET /api/posts/:postid - get a user's specific post
// router.get('/:postid', (req, res) => {
//   const { postid } = req.params
//   Posts.findPostById(postid)
//     .then((post) => {
//       res.status(200).json(post)
//     })
//     .catch((err) => {
//       res.status(500).json({ message: 'error finding post' })
//     })
// })

module.exports = router
