// const axios = require('axios')

const router = require('express').Router()
const Posts = require('./posts-model')

// api/posts/:id/user - get a specific users posts
router.get('/:id/user', (req, res) => {
  const userId = req.params.id
  Posts.findAll(userId)
    .then((posts) => {
      res.status(200).json(posts)
    })
    .catch((err) => {
      res.status(500).json({ message: 'error finding posts' })
    })
})
// api/posts/:id - get a specific post
router.get('/:id', (req, res) => {
  const { id } = req.params
  Posts.findById(id)
    .then((post) => {
      req.status(200).json(post)
    })
    .catch((err) => {
      res.status(500).json({ message: 'error finding post' })
    })
})

// router.post('/', (req, res) => {
//   const post = req.body

//   Posts.add(post)
// })

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
