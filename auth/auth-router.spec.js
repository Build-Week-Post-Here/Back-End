const request = require('supertest')
const server = require('../api/server')
const db = require('../database/dbConfig')
// const Users = require('../users/users-model')

describe('POST /api/auth/register', () => {

  beforeEach(async () => {
    jest.useFakeTimers()
    await db('users').truncate()
  })

  it('should return a 201 CREATED status code', async () => {
    const response = await request(server)
      .post('/api/auth/register')
      .send({ email: 'user1', password: 'pass' })
    expect(response.status).toBe(201)
  })

  it('should send back JSON', async () => {
    const response = await request(server)
      .post('/api/auth/register')
      .send({ email: 'user1', password: 'pass' })
    expect(response.type).toMatch(/json/i)
  })

  it('should send back saved user', async () => {
    const response = await request(server)
      .post('/api/auth/register')
      .send({ email: 'user1', password: 'pass' })
    expect(response.body.email).toBe('user1')
  })
})

describe('POST /api/auth/login', () => {

  it('should allow a registered user to log in', async () => {
    const response = await request(server)
      .post('/api/auth/login')
      .send({ email: 'user1', password: 'pass' })
    expect(response.status).toBe(200)
  })

  it('denies access if user has incorrect credentials', async () => {
    const response = await request(server)
      .post('/api/auth/login')
      .send({ email: 'user1', password: 'notmypass' })
    expect(response.status).toBe(401)
  })
})
