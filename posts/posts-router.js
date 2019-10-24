const router = require('express').Router()
const Posts = require('./posts-model')
const Users = require('../users/users-model')
const Recs = require('../recs/recs-model')

// GET /api/posts/:userid/posts - get a specific users posts
router.get('/:userid/user', (req, res) => {
  const { userid } = req.params
  Posts.findAllPosts(userid)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      res.status(500).json({ message: 'error finding posts' })
    })
})

// GET /api/posts/:postid - get a user's specific post
router.get('/:postid', (req, res) => {
  const { postid } = req.params
  Posts.findPostById(postid)
    .then(post => {
      res.status(200).json(post)
    })
    .catch(err => {
      res.status(500).json({ message: 'error finding post' })
    })
})

// POST /api/posts/:userid - save a users new post
router.post('/:userid', (req, res) => {
  const entry = req.body
  const { userid } = req.params
  // sets param id as post's user_id property
  entry.post.user_id = userid

  // checks if current user exists
  Users.findUserById(userid)
    .then(user => {
      if (user) {
        // adds new post
        Posts.add(entry)
          .then(post => {
            // sets new post id as each rec's post_id property
            entry.rec1.post_id = post.id
            entry.rec2.post_id = post.id
            entry.rec3.post_id = post.id
            entry.rec4.post_id = post.id
            entry.rec5.post_id = post.id
            // adds new post recs
            Recs.saveRecs(entry)
              .then(recs => res.status(201).json(recs))
              .catch(err => {
                res.status(401).json({ message: 'error saving recs' })
              })
          })
          .catch(err => {
            res.status(401).json({ message: 'error saving post' })
          })
      }
    })
    .catch(err => res.status(500).json({ message: 'Failed to save new post' }))
})

// UPDATE /api/posts/:postid - update a users post
router.put('/:postid', (req, res) => {
  const changes = req.body
  const { postid } = req.params
  // checks if post exists
  Posts.findPostById(postid)
    .then(post => {
      if (post) {
        // updates existing post
        Posts.update(changes.post, postid)
          .then(post => {
            // updates post recs
            Recs.updateRecs(changes, postid)
              .then(recs => res.status(200).json(recs))
              .catch(err => {
                res.status(401).json({ message: 'error updating recs' })
              })
          })
          .catch(err => {
            res.status(401).json({ message: 'error updating post' })
          })
      }
    })
    .catch(err => res.status(500).json({ message: 'Failed to update post' }))
})

// DELETE /api/posts/:postid - delete a users post
router.delete('/:postid', (req, res) => {
  const { postid } = req.params

  Posts.remove(postid)
    .then(deleted => {
      if (deleted) {
        res.status(200).json({ removed: deleted })
      } else {
        res.status(404).json({ message: 'Could not find post with given id' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to delete post' })
    })
})

module.exports = router
