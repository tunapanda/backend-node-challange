const { Model } = require('objection');
const knex = require('../db');

class TaskModel extends Model {
  static get tableName() {
    return 'tasks';
  }
};

TaskModel.knex(knex);

module.exports = TaskModel;