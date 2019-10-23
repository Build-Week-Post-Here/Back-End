// const axios = require('axios')

const router = require('express').Router()
const Posts = require('./posts-model')
const Users = require('../users/users-model')

// GET /api/posts/:userid/posts - get a specific users posts
router.get('/:userid/user', (req, res) => {
  const { userid } = req.params
  Posts.findAllPosts(userid)
    .then((posts) => {
      res.status(200).json(posts)
    })
    .catch((err) => {
      res.status(500).json({ message: 'error finding posts' })
    })
})

// GET /api/posts/:postid - get a user's specific post
router.get('/:postid', (req, res) => {
  const { postid } = req.params
  Posts.findPostById(postid)
    .then((post) => {
      res.status(200).json(post)
    })
    .catch((err) => {
      res.status(500).json({ message: 'error finding post' })
    })
})

// POST /api/posts/:userid - save a users new post
router.post('/:userid', (req, res) => {
  const post = req.body
  // setting param id as post's user_id
  post.user_id = req.params.userid
  const { userid } = req.params

  Users.findUserById(userid)
    .then(user => {
      // checks if current user exists
      if (user) {
        Posts.add(post, userid)
          .then(post => {
            res.status(201).json(post)
          })
          .catch(err => {
            res.status(500).json({ message: 'Failed to save new post'})
          })
      }
    })

})

// UPDATE /api/posts/:postid - update a users post
router.put('/:postid', (req, res) => {
  const changes = req.body
  const { postid } = req.params
  Posts.findPostById(postid)
    .then((user) => {
      if (user) { // if user is in db, we can add the post
        Posts.update(postid, changes)
          .then(changes => {
            res.status(200).json(changes)
          })
      } else {
        res.status(500).json({ message: 'Failed to update post' })
      }
    })
})

// DELETE /api/posts/:postid - delete a users post
router.delete('/:postid', (req, res) => {
  const { postid } = req.params

  Posts.remove(postid)
    .then((deleted) => {
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

// const requestOptions = {
//   headers: { accept: 'application/json' }
// }
// axios
//   .get('https://icanhazdadjoke.com/search', requestOptions)
//   .then(response => {
//     res.status(200).json(response.data.results);
//   })
//   .catch(err => {
//     res.status(500).json({ message: 'Error Fetching Jokes', error: err });
//   });

module.exports = router
