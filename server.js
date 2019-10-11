const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
// const errorHandler = require('./middleware/error');
// const logger = require('./middleware/logger');
const path = require('path');
const koaQs = require('koa-qs');

const app = new Koa();
const router = new Router({
  prefix: '/api/v1'
});

koaQs(app);

app.use(bodyParser());

router.use(require('./routes/tasks'));
router.use(require('./routes/users'));


app.use(router.routes());

module.exports = app;
