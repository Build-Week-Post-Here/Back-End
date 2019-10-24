
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('recs').del()
    .then(function () {
      // Inserts seed entries
      return knex('recs').insert([
        {subreddit: 'IAmA', score: 43, post_id: 1},
        {subreddit: 'dogs', score: 31, post_id: 1},
        {subreddit: 'sharks', score: 20, post_id: 1},
        {subreddit: 'ProRevenge', score: 19, post_id: 1},
        {subreddit: 'AmITheAsshole', score: 8, post_id: 1},
        {subreddit: 'AskReddit', score: 89, post_id: 2},
        {subreddit: 'dadjokes', score: 75, post_id: 2},
        {subreddit: 'Cringetopia', score: 3, post_id: 2},
        {subreddit: 'askscience', score: 9, post_id: 2},
        {subreddit: 'yesyesyesnoyes', score: 18, post_id: 2},
        {subreddit: 'ShowerThoughts', score: 87, post_id: 3},
        {subreddit: 'assholetax', score: 39, post_id: 3},
        {subreddit: 'godtiersuperpowers', score: 13, post_id: 3},
        {subreddit: 'besoflegaladvice', score: 45, post_id: 3},
        {subreddit: 'talesfromcallcenters', score: 89, post_id: 3},
        {subreddit: 'absolutelynotmeirl', score: 16, post_id: 4},
        {subreddit: 'AmITheAsshole', score: 50, post_id: 4},
        {subreddit: 'AskReddit', score: 20, post_id: 4},
        {subreddit: 'midfulness', score: 79, post_id: 4},
        {subreddit: 'Jokes', score: 9, post_id: 4},
        {subreddit: 'absolutelynotmeirl', score: 16, post_id: 5},
        {subreddit: 'lifeprotips', score: 50, post_id: 5},
        {subreddit: 'socialskills', score: 20, post_id: 5},
        {subreddit: 'offmychest', score: 79, post_id: 5},
        {subreddit: 'Jokes', score: 9, post_id: 5}
      ]);
    });
};
