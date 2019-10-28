const request = require('supertest')
const server = require('../api/server')
const db = require('../database/dbConfig')

describe('GET /api/posts/:userid/user', () => {
  afterAll(async () => {
    await db('posts').truncate()
    await db('users').truncate()
  })
  beforeEach(async () => {
    await db('posts').truncate()
    await db('users').truncate()
    await request(server)
      .post('/api/auth/register')
      .send({ email: 'user1', password: 'pass' })
  })

  it('should return 200 http status code', async () => {
    const login = await request(server)
      .post('/api/auth/login')
      .send({ email: 'user1', password: 'pass' })
    const posts = await request(server)
      .get(`/api/posts/${login.body.user.id}/user`)
      .set('Authorization', login.body.token)
    expect(posts.status).toBe(200)
  })

  it('should send back JSON', async () => {
    const login = await request(server)
      .post('/api/auth/login')
      .send({ email: 'user1', password: 'pass' })
    await request(server)
      .post('/api/posts/1/user')
      .send({ email: 'user1', password: 'pass' })
    expect(login.type).toMatch(/json/i)
  })

  it('should return correct number of posts', async () => {
    const login = await request(server)
      .post('/api/auth/login')
      .send({ email: 'user1', password: 'pass' })
    await db('posts').insert({
      user_id: 1,
      title: 'title1',
      content: 'content1'
    })
    await db('posts').insert({
      user_id: 1,
      title: 'title2',
      content: 'content2'
    })
    const posts = await request(server)
      .get(`/api/posts/${login.body.user.id}/user`)
      .set('Authorization', login.body.token)
    expect(posts.body).toHaveLength(2)
  })

  it("should return the requested user's posts", async () => {
    const login = await request(server)
      .post('/api/auth/login')
      .send({ email: 'user1', password: 'pass' })
    await db('posts').insert({
      user_id: 1,
      title: 'title1',
      content: 'content1'
    })
    await db('posts').insert({
      user_id: 1,
      title: 'title2',
      content: 'content2'
    })
    const posts = await request(server)
      .get(`/api/posts/${login.body.user.id}/user`)
      .set('Authorization', login.body.token)
    expect(posts.body[0].title).toBe('title1')
  })
})

describe('GET /api/posts/:postid', () => {
  afterAll(async () => {
    await db('posts').truncate()
    await db('users').truncate()
  })
  beforeEach(async () => {
    await db('posts').truncate()
    await db('users').truncate()
    await request(server)
      .post('/api/auth/register')
      .send({ email: 'user1', password: 'pass' })
  })

  it('should return 200 http status code', async () => {
    const login = await request(server)
      .post('/api/auth/login')
      .send({ email: 'user1', password: 'pass' })
    const posts = await request(server)
      .get('/api/posts/1')
      .set('Authorization', login.body.token)
    expect(posts.status).toBe(200)
  })

  it('should send back JSON', async () => {
    const login = await request(server)
      .post('/api/auth/login')
      .send({ email: 'user1', password: 'pass' })
    await request(server)
      .post('/api/posts/1')
      .send({ email: 'user1', password: 'pass' })
    expect(login.type).toMatch(/json/i)
  })

  it('should return a single post', async () => {
    const login = await request(server)
      .post('/api/auth/login')
      .send({ email: 'user1', password: 'pass' })
    await db('posts').insert({
      user_id: 1,
      title: 'title1',
      content: 'content1'
    })
    await db('posts').insert({
      user_id: 1,
      title: 'title2',
      content: 'content2'
    })
    const posts = await request(server)
      .get(`/api/posts/1`)
      .set('Authorization', login.body.token)
    expect(posts.body.title).not.toEqual('title2')
  })

  it("should return the requested user's post", async () => {
    const login = await request(server)
      .post('/api/auth/login')
      .send({ email: 'user1', password: 'pass' })
    await db('posts').insert({
      user_id: 1,
      title: 'title1',
      content: 'content1'
    })
    const posts = await request(server)
      .get(`/api/posts/${login.body.user.id}/user`)
      .set('Authorization', login.body.token)
    expect(posts.body[0].title).toBe('title1')
  })
})

describe('POST /api/posts/:userid', () => {
  afterAll(async () => {
    await db('posts').truncate()
    await db('users').truncate()
  })
  beforeEach(async () => {
    await db('posts').truncate()
    await db('users').truncate()
    await request(server)
      .post('/api/auth/register')
      .send({ email: 'user1', password: 'pass' })
  })

  it('should return 201 http status code', async () => {
    const login = await request(server)
      .post('/api/auth/login')
      .send({ email: 'user1', password: 'pass' })
    const posts = await request(server)
      .post('/api/posts/1')
      .set('Authorization', login.body.token)
      .send({
        post: { title: 'title1', content: 'content1' },
        recs: [
          { subreddit: 'IAmA', score: 1 },
          { subreddit: 'dadjokes', score: 2 },
          { subreddit: 'AskReddit', score: 3 },
          { subreddit: 'ShowerThoughts', score: 4 },
          { subreddit: 'relationship_advice', score: 5 }
        ]
      })
    expect(posts.status).toBe(201)
  })

  it('should return a list of saved recs if user is signed in', async () => {
    const login = await request(server)
      .post('/api/auth/login')
      .send({ email: 'user1', password: 'pass' })
    const posts = await request(server)
      .post('/api/posts/1')
      .set('Authorization', login.body.token)
      .send({
        post: { title: 'title1', content: 'content1' },
        recs: [
          { subreddit: 'IAmA', score: 1 },
          { subreddit: 'dadjokes', score: 2 },
          { subreddit: 'AskReddit', score: 3 },
          { subreddit: 'ShowerThoughts', score: 4 },
          { subreddit: 'relationship_advice', score: 5 }
        ]
      })
    expect(posts.body).toHaveLength(5)
  })
})
