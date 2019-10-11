
exports.up = knex =>
  knex.schema
    .createTable('users', table => {
      table.increments('id').primary().index();
      table.text('email').unique().index();
      table.text('username').unique().index();
      table.text('hash');
      table.text('last_seen');
      table.text('last_ip');
      table.timestamps();
    })
    .createTable('tasks', table => {
      table.increments('id').primary().index();
      table.text('name');
      table.text('description');
      table.text('creator').references('users');
      table.timestamps();
    });

exports.down = knex =>
  knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('tasks');