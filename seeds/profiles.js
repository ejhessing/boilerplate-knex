
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('profiles').del()
    .then(function () {
      return Promise.all([
        // table.string('url')
        // table.string('profilePic')
        // table.integer('user_id')

                // Inserts seed entries
        knex('profiles').insert({url: 'https://playoverwatch.com/en-us/', profilePic: 'http://cdn.gamer-network.net/2016/usgamer/Overwatch-Tracer-02.jpg', user_id:99901}),
        knex('profiles').insert({url: 'http://us.battle.net/d3/en/', profilePic: 'https://www-users.cs.york.ac.uk/~mjf/zergling/Images/1.jpg', user_id:99902}),
        knex('profiles').insert({url: 'http://us.battle.net/sc2/en/', profilePic: 'http://static.mnium.org/images/contenu/actus/Heroes_Storm/Heros/Johanna/sommaire_johanna.jpg', user_id:99903})
      ]);
    });
};
