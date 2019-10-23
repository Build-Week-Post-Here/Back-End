
const jwt = require('jsonwebtoken')

function generateToken(user) {
  const payload = {
    email: user.email,
    id: user.id
  }
  const options = {
    expiresIn: '1h'
  }

  return jwt.sign(payload, process.env.JWT_SECRET, options)
}

module.exports = generateToken
