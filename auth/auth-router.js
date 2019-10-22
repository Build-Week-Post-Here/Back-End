const router = require('express').Router()
const bcrypt = require('bcryptjs')
const generateToken = require('./token-middleware')
const Users = require('../users/users-model')

router.post('/register', (req, res) => {
  let { email, password } = req.body // deconstruct user sent in request

  // checks if username is already taken
  Users.findBy({ email }).then((newUser) => {
    if (newUser) {
      res.status(401).json({ message: 'username is already taken' })
    }
  })

  const hash = bcrypt.hashSync(password, 10) // hash the password
  password = hash // set hased password as the password

  // add the new user to database
  Users.add({ email, password })
    .then((saved) => {
      res.status(201).json(saved) // send back the saved user
    })
    .catch((err) => {
      res.status(500).json({ message: 'cannot add the user', err })
    })
})

router.post('/login', (req, res) => {
  let { email, password } = req.body // capture username, pass from request

  Users.findBy({ email })
    .first()
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        // generate a token
        const token = generateToken(user)
        // add token to response
        res.status(200).json({
          message: `Welcome ${user.email}`,
          token
        })
      } else {
        res.status(401).json({ message: 'Invalid credentials' })
      }
    })
    .catch((err) => {
      res.status(500).json(err)
    })
})

module.exports = router
