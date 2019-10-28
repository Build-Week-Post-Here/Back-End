# Back-End

## User signup:

> POST https://reddit-ranker.herokuapp.com/api/auth/register

request body example:

```js
{
  "email": "shaq@mail.com",
  "password": "pass123"
}
```

response boy example:

```js
{
  "id": 12,
  "email": "shaq@mail.com"
}
```

## User login:

> POST https://reddit-ranker.herokuapp.com/api/auth/login

request body example:

```js
{
  "email": "grandma@mail.com",
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

## Save a new post and recommendations with the user's id:

> POST https://reddit-ranker.herokuapp.com/api/posts/:userid

request body example:

```js
{
  "post": {
    "title": "I lost my job at the bank my very first day",
    "content": "A woman asked me to check her balance so I pushed her over"
  },
  "recs": [
    {
      "subreddit": "IAmA",
      "score": 1
    },
    {
      "subreddit": "dadjokes",
      "score": 2
    },
    {
      "subreddit": "AskReddit",
      "score": 3
    },
    {
      "subreddit": "ShowerThoughts",
      "score": 4
    },
    {
      "subreddit": "relationship_advice",
      "score": 4
    }
  ]
}
```

response body example:

```js
;[
  {
    id: 26,
    subreddit: 'IAmA',
    score: 1,
    post_id: 7
  },
  {
    id: 27,
    subreddit: 'dadjokes',
    score: 2,
    post_id: 7
  },
  {
    id: 28,
    subreddit: 'AskReddit',
    score: 3,
    post_id: 7
  },
  {
    id: 29,
    subreddit: 'ShowerThoughts',
    score: 4,
    post_id: 7
  }
]
```

## Update a post and recommendations with the post id:

> PUT https://reddit-ranker.herokuapp.com/api/posts/:postid

request body example:

```js
{
  "post": {
    "title": "I lost my job at the bank my very first day",
    "content": "A woman asked me to check her balance so I pushed her over"
  },
  "recs": [
		{
			"id": 6,
			"subreddit": "unpopularopinion",
			"score": 1
		},
		{
			"id": 7,
			"subreddit": "dadjokes",
			"score": 2
		},
		{
			"id": 8,
			"subreddit": "AskReddit",
			"score": 3
		},
		{
			"id": 9,
			"subreddit": "ShowerThoughts",
			"score": 4
		},
		{
			"id": 10,
			"subreddit": "TIFU",
			"score": 5
		}
	]
}
```

response body example:

```js
;[
  {
    id: 6,
    subreddit: 'AskReddit',
    score: 89,
    post_id: 2
  },
  {
    id: 7,
    subreddit: 'dadjokes',
    score: 75,
    post_id: 2
  },
  {
    id: 8,
    subreddit: 'Cringetopia',
    score: 3,
    post_id: 2
  },
  {
    id: 9,
    subreddit: 'askscience',
    score: 9,
    post_id: 2
  },
  {
    id: 10,
    subreddit: 'yesyesyesnoyes',
    score: 18,
    post_id: 2
  }
]
```

## Delete a post and recommendations with the post id:

> DELETE https://reddit-ranker.herokuapp.com/api/posts/:postid

- successful deletion returns 1, unsuccessful deletion returns 0

response body example:

```js
{
  "removed": 1
}
```
