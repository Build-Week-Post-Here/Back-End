exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('posts')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('posts').insert([
        {
          title: 'Title1',
          content: 'post1 content',
          tags: null,
          post_img: null
        },
        {
          title: 'Title2',
          content: 'post2 content',
          tags: null,
          post_img: null
        },
        {
          title: 'Title3',
          content: 'post3 content',
          tags: null,
          post_img: null
        }
      ])
    })
}
