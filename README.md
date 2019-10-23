# Back-End

## User signup:

> POST https://reddit-ranker.herokuapp.com/api/auth/register

request body example:

```js
{
  "email": "grandma@mail.com",
  "password": "pass123"
}
```

response boy example:

```js
{
  "id": 12,
  "email": "grandma@mail.com"
}
```

## User login:

> POST https://reddit-ranker.herokuapp.com/api/auth/login

request body example:

```js
{
  "email": "shaq@me.com",
  "password": "pass123"
}
```

response body example:

```js
{
  "message": "Welcome grandma@mail.com",
  "user": {
    "id": 11,
    "email": "grandma@mail.com",
    "profile_img": null
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdyYW5kbWEiLCJpZCI6MTEsImlhdCI6MTU3MTgwNjYzMSwiZXhwIjoxNTcxODEwMjMxfQ.-eqokqd4E6awsQLgBRll3m14os8O3AJ4MoCLcbzYxns"
}
```

## Get all users posts:

> GET https://reddit-ranker.herokuapp.com/api/posts/:userid/user

response example:

```js
;[
  {
    id: 3,
    title: 'Title3',
    content: 'post3 content',
    created_at: '2019-10-22 16:56:44',
    updated_at: '2019-10-22 16:56:44',
    tags: null,
    post_img: null,
    user_id: 2
  },
  {
    id: 4,
    title: 'Title4',
    content: 'post4 content',
    created_at: '2019-10-22 16:56:44',
    updated_at: '2019-10-22 16:56:44',
    tags: null,
    post_img: null,
    user_id: 2
  }
]
```

## Get a specific post with post id:

> GET https://reddit-ranker.herokuapp.com/api/posts/:postid

response example:

```js
{
  id: 3,
  title: 'Title3',
  content: 'post3 content',
  created_at: '2019-10-22 16:56:44',
  updated_at: '2019-10-22 16:56:44',
  tags: null,
  post_img: null,
  user_id: 2
}
```

## Create new post with user id:

> POST https://reddit-ranker.herokuapp.com/api/posts/:userid

request body example:

```js
{
	"title": "wild cowboy",
	"content": "boots, spurs and lassos"
}
```

response body example:

```js
{
  "id": 9,
  "title": "wild cowboy",
  "content": "boots, spurs and lassos",
  "created_at": "2019-10-23 05:06:57",
  "updated_at": "2019-10-23 05:06:57",
  "tags": null,
  "post_img": null,
  "user_id": 7
}
```

## Update a users post:

> PUT https://reddit-ranker.herokuapp.com/api/posts/:postid

request body example:

```js
{
	"title": "wild cowboy",
	"content": "boots, spurs and lassos"
}
```

response body example:

```js
{
  "id": 7,
  "title": "wild cowboy",
  "content": "boots, spurs and lassos",
  "created_at": "2019-10-22 21:55:47",
  "updated_at": "2019-10-22 21:55:47",
  "tags": null,
  "post_img": null,
  "user_id": 1
}
```

## Delete a users post:

> DELETE https://reddit-ranker.herokuapp.com/api/posts/:postid

response body example:

```js
{
  "removed": 1
}
```
