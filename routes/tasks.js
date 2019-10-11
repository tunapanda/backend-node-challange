const Router = require('koa-router');
const Task = require(`../models/task`);

const router = new Router({
  prefix: `/tasks`
});

router.get('/', async ctx => {
  let tasks = Task.query();

  tasks = await tasks;

  ctx.body = { tasks };
});

router.get('/:id', async ctx => {
  const task = await Task.query().findOne({ id: ctx.params.id });

  ctx.body = { task: task };
});

router.post('/', async ctx => {

  const newTask = ctx.request.body.task;

  const task = await Task.query().insertAndFetch(newTask);

  ctx.status = 201;
  ctx.body = { task };
});

router.put('/:id', async ctx => {
  const task = await Task.query().patchAndFetchById(ctx.params.id, ctx.request.body.task);

  ctx.body = { task };
});

router.delete('/:id', ctx => {
  const task = Task.query().delete(ctx.params.id);

  ctx.body = { task };
});

module.exports = router.routes();