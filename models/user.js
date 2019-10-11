const { Model } = require('objection');
const knex = require('../db');
const moment = require('moment');

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get relationMappings() {
    return {
      tasks: {
        relation: this.HasManyRelation,
        modelClass: __dirname + '/task',
        join: {
          from: 'users.id',
          to: 'tasks.creator'
        }
      }
    };
  }

  async $createOneTimeToken(user_id, expires, type) {
    const oneTimeKey = await knex('security_tokens').insert({ user_id, expires, type });
    return oneTimeKey.token;
  }

  async $verifyOneTimeToken(user_id, token) {
    const oneTimeKey = await knex('security_tokens').where({ user_id, token });
    if (oneTimeKey.length && moment().isBefore(oneTimeKey.expires)) {
      return true;
    }
    return false;
  }
}

User.knex(knex);

module.exports = User;