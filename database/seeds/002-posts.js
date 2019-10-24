exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('posts')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('posts').insert([
        {
          user_id: 1,
          title: 'Mean boss lets his self importance screw himself over',
          content:
            'So I saw a post that said "Do you know who I am"? and it triggered a memory of a boss we had about ten years ago.',
          tags: null,
          post_img: null
        },
        {
          user_id: 1,
          title:
            "The world's real superpower is being able to sleep as soon as hitting the pillow.",
          content: '',
          tags: null,
          post_img: null
        },
        {
          user_id: 2,
          title: 'Saddest call ever',
          content:
            "So I worked nights and it got reeeaaally slow and it's a small crew. After the first call we hit it off, he got my badge # and would just chat. Anyway 2 years of friday night chats. Wonderful man, wasn't a perv or weirdo. He calls and he sounds upset. His kids put him in a horrible home, he has to return all the clocks he's bought. Now I'm crying, like yeah of course you can you're my buddy man. I think about that sweet old man all the time.",
          tags: null,
          post_img: null
        },
        {
          user_id: 2,
          title:
            'Reddit has become the place where the childhood bullied become the bullies',
          content:
            "Let me explain. The Reddit community is the most condescending trash I have ever seen. The majority of people here are extremely critical of intelligence to the point where it could be considered bullying. You get one thing wrong they will pounce onto you and just shut everything you have to say with 'you're not smart, remember when you said this.' one of the biggest targets is the general populace, who are heavily subject to the 'superior' redditors. This is just used to treat their insecurities in saying 'we're special and different right? We're smart' no you're not, you're literally a clone of every neckbeard redditor on the site so stfu",
          tags: null,
          post_img: null
        },
        {
          user_id: 3,
          title:
            'I found I can remove a bad thought quickly by imagining myself doing something like swatting it away or zapping it and I instantly clear my mind.',
          content:
            'Anyone else relate to this? What is this called? I would like to look more into this to understand it better.',
          tags: null,
          post_img: null
        },
        {
          user_id: 3,
          title: 'My husband re proposed',
          content:
            "We just celebrated our 10 year anniversary. We got married really young and have gone thru a lot of ups and downs. But he got down on one knee and gave me a new ring and asked me to marry him again with a real wedding (we got married at a courthouse with just our parents there and had to go back to work the very next day lol). It was really sweet and I can't wait to see what the next 10 years brings us. And I'm looking forward to a nice little wedding :)",
          tags: null,
          post_img: null
        }
      ])
    })
}
