
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('recs').del()
    .then(function () {
      // Inserts seed entries
      return knex('recs').insert([
        {subreddit: 'AmITheAsshole', score: 1, post_id: 1},
        {subreddit: 'ProRevenge', score: 2, post_id: 1},
        {subreddit: 'sharks', score: 3, post_id: 1},
        {subreddit: 'dogs', score: 4, post_id: 1},
        {subreddit: 'IAmA', score: 5, post_id: 1},
        {subreddit: 'yesyesyesnoyes', score: 1, post_id: 2},
        {subreddit: 'askscience', score: 2, post_id: 2},
        {subreddit: 'Cringetopia', score: 3, post_id: 2},
        {subreddit: 'dadjokes', score: 4, post_id: 2},
        {subreddit: 'AskReddit', score: 5, post_id: 2},
        {subreddit: 'talesfromcallcenters', score: 1, post_id: 3},
        {subreddit: 'ShowerThoughts', score: 2, post_id: 3},
        {subreddit: 'godtiersuperpowers', score: 3, post_id: 3},
        {subreddit: 'besoflegaladvice', score: 4, post_id: 3},
        {subreddit: 'assholetax', score: 5, post_id: 3},
        {subreddit: 'absolutelynotmeirl', score: 1, post_id: 4},
        {subreddit: 'AskReddit', score: 2, post_id: 4},
        {subreddit: 'midfulness', score: 3, post_id: 4},
        {subreddit: 'Jokes', score: 4, post_id: 4},
        {subreddit: 'AmITheAsshole', score: 5, post_id: 4},
        {subreddit: 'absolutelynotmeirl', score: 1, post_id: 5},
        {subreddit: 'lifeprotips', score: 2, post_id: 5},
        {subreddit: 'socialskills', score: 3, post_id: 5},
        {subreddit: 'offmychest', score: 4, post_id: 5},
        {subreddit: 'Jokes', score: 5, post_id: 5}
      ]);
    });
};
