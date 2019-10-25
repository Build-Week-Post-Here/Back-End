const request = require('supertest')
const server = require('../api/server')
const db = require('../database/dbConfig')

describe('should be the correct database environment', () => {
  it('should set the testing environment', () => {
    expect(process.env.DB_ENV).toBe('testing')
  })
})

describe('POST /api/auth/register', () => {
  beforeEach(async () => {
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

describe('GET /posts/:userid/user', () => {

  // beforeAll(async () => {
  //   await request(server)
  //     .post('/api/auth/register')
  //     .send({ email: 'user1', password: 'pass' })
  // })

  beforeEach(async () => {
    // jest.useFakeTimers()
    await db('posts').truncate()
    // await request(server)
    //   .post('/api/auth/register')
    //   .send({ email: 'user1', password: 'pass' })
  })

  it('should return 200 http status code', async () => {
    const login = await request(server)
      .post('/api/auth/login')
      .send({ email: 'user1', password: 'pass' })

    console.log('*** LOGIN: ', login.body)

    const posts = await request(server)
      .get('/api/posts/1/user')
      // .auth('user1', 'pass')
      .send({ email: 'user1', password: 'pass' })
      .set('Authorization', login.body.token)
    console.log('*** POSTS: ', posts.request.header)
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

  it("should send back user's posts", async () => {
    const login = await request(server)
      .post('/api/auth/login')
      .send({ email: 'user1', password: 'pass' })

    await db('posts').insert({ user_id: 1,title:'title1',content:'content1'})
    await db('posts').insert({ user_id: 1,title:'title2',content:'content2'})
    // const post1 = await db('posts')
    // console.log('post1: ', post1)

    const posts = await request(server)
      .get('/api/posts/1/user')
      .set('Authorization', login.body.token)
      // console.log('*** login.body.token: ', login.body.token)
      // console.log('*** posts.request.header: ', posts.request.header)
      // console.log('*** posts.body: ',posts.body)

    expect(posts.body).toHaveLength(2)
    // expect(posts.body.title).toBe('title1')
  })
})

describe('GET /api/posts/:postid', () => {
  beforeAll(async () => {
    await request(server)
      .post('/api/auth/register')
      .send({ email: 'user1', password: 'pass' })
  })

  beforeEach(async () => {
    // jest.useFakeTimers()
    await db('posts').truncate()
  })

  it('should return 200 http status code', async () => {
    const login = await request(server)
      .post('/api/auth/login')
      .send({ email: 'user1', password: 'pass' })
    // console.log('*** LOGIN: ', login.body)
    const posts = await request(server)
      .get('/api/posts/1')
      .set('Authorization', login.body.token)
    // console.log('*** POSTS: ', posts.request.header)
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
})

// describe('POST /api/posts/:userid', async () => {

//   beforeEach(async () => {
//     jest.useFakeTimers()
//     await db('posts').truncate()
//   })

//   // await request(server)
//   //   .post('/api/auth/register')
//   //   .send({ email: 'user2', password: 'pass' })

//   it('should return 201 http status code', async () => {
//     jest.useFakeTimers()

//     const login = await request(server)
//       .post('/api/auth/login')
//       .send({ email: 'user2', password: 'pass' })
//     const posts = await request(server)
//       .get('/api/posts')
//       .set('Authorization', login.body.token)
//     expect(posts.status).toBe(201)
//   })

//   // it('should save new post to db')
//   // it('should save new post recs to db')

//   xit('should return a list of recs if user is signed in', async () => {
//     const login = await request(server)
//       .post('/api/auth/login')
//       .send({ email: 'user2', password: 'pass' })
//     const posts = await request(server)
//       .get('/api/posts/1')
//       .set('Authorization', login.body.token)
//     expect(posts.body)
//   })
// })
