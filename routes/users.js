const Router = require('koa-router');
const validate = require('validate.js');
const User = require('../models/user');
const { ref } = require('objection');

const router = new Router({
  prefix: '/users'
});

async function validateNewUser(ctx, next) {
  try {
    await validate.async(ctx.request.body.user, {
      email: function (value, attributes) {
        if (attributes.phonenumber) {
          return {
            email: true
          };
        }
        return {
          presence: true,
          email: true
        };
      },
      phonenumber: function (value, attributes) {
        if (attributes.email) {
          return {
            numericality: true
          };
        }
        return {
          presence: true,
          numericality: true
        };
      },
      username: {
        presence: true,
        format: '[a-zA-Z0-9_-]*'
      },
      password: {
        presence: true,
        length: {
          minimum: 8,
          maximum: 50
        }
      }
    });
  } catch (errors) {
    return ctx.throw(400, { errors });
  }
  await next();
}

router.get('/', async ctx => {
  let users = User.query();

  users = await users;

  ctx.body = { users };

});

router.get('/:id', async ctx => {
  const user = await User.query().findById(ctx.params.id);

  ctx.body = { user };
});

router.post('/', validateNewUser, async ctx => {

  ctx.request.body.user.username = ctx.request.body.user.username.toLowerCase();

  let newUser = ctx.request.body.user;

  const user = await User.query().insertAndFetch(newUser);

  ctx.status = 201;
  ctx.body = { user };
});

router.put('/:id', async ctx => {

  const user = await User.query().patchAndFetchById(ctx.params.id, ctx.request.body.user);

  ctx.body = { user };
});

router.delete('/:id', async ctx => {

  const user = await User.query().findById(ctx.params.id);

  await User.query().delete().where({ id: ctx.params.id });

  ctx.body = { user };
});

module.exports = router.routes();
