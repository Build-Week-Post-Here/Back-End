
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {email: 'joe1337@me.com', password: 'joe000', profile_img: null},
        {email: 'fakenews99@me.com', password: 'passpass', profile_img: null},
        {email: 'gma3000@me.com', password: 'grandma', profile_img: null}
      ]);
    });
};
