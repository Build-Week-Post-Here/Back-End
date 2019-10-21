
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'joe1337', password: 'joe000', profile_img: null},
        {username: 'fakenews1994', password: 'passpass', profile_img: null},
        {username: 'gma3000', password: 'grandma', profile_img: null}
      ]);
    });
};
