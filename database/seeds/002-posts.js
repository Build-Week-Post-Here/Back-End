exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('posts')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('posts').insert([
        {
          user_id: 1,
          title: 'Title1',
          content: 'post1 content',
          tags: null,
          post_img: null
        },
        {
          user_id: 1,
          title: 'Title2',
          content: 'post2 content',
          tags: null,
          post_img: null
        },
        {
          user_id: 2,
          title: 'Title3',
          content: 'post3 content',
          tags: null,
          post_img: null
        },
        {
          user_id: 2,
          title: 'Title4',
          content: 'post4 content',
          tags: null,
          post_img: null
        },
        {
          user_id: 3,
          title: 'Title5',
          content: 'post5 content',
          tags: null,
          post_img: null
        },
        {
          user_id: 3,
          title: 'Title6',
          content: 'post6 content',
          tags: null,
          post_img: null
        }
      ])
    })
}
