
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('tasks').del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {
          name: 'Solve all github issues',
          description: 'Solve the world\'s Github issues.',
          creator: 2
        },
        {
          name: 'A task',
          description: 'This is a task.',
          creator: 2
        },
        {
          name: 'Clean the kitchen',
          description: 'It\'s filthy!',
          creator: 2
        }
      ]);
    });
};
