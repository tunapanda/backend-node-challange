
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { id: 1, username: 'mick', email: 'mick@tunapanda.org' },
        { id: 2, username: 'jake', email: 'jake@tunapanda.org' },
        { id: 3, username: 'nathen', email: 'nathen@tunapanda.org' },
        { id: 4, username: 'jay', email: 'jay@tunapanda.org' },
        { id: 5, username: 'scadden', email: 'scadden@tunapanda.org' }
      ]);
    });
};
