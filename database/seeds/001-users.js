const bcrypt = require('bcryptjs')

const user1 = {email: 'joe1337@mail.com', password: 'password', profile_img: null}
user1.password = bcrypt.hashSync(user1.password, 10)
const user2 = {email:'fakenews@mail.com', password: 'passpass', profile_img: null}
user2.password = bcrypt.hashSync(user2.password, 10)
const user3 = {email: 'grandma@mail.com', password: 'password', profile_img: null}
user3.password = bcrypt.hashSync(user3.password, 10)

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        user1,
        user2,
        user3
      ]);
    });
};
