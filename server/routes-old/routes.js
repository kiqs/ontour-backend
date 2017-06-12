const Router = require('koa-router'),
      KoaBody = require('koa-body'),
      {getId, list, createItem, updateItem, removeItem} = require('../controllers/index');

const passport = require('../config/passport');
const router = new Router();

router
  .get('/users',        list)
  .get('/users/:id',    getId)
  .post('/users/',      KoaBody(), createItem)
  .put('/users/:id',    KoaBody(), updateItem)
  .delete('/users/:id', removeItem)
  .get('/auth/github', passport.authenticate('github', {scope: ['user','repo']}))
  .get('/auth/github/callback', passport.authenticate('github', {successRedirect: '/', failureRedirect: '/'}))
  .post('/login', passport.authenticate('local', {
    successRedirect: '/app',
    failureRedirect: '/'
  }))
  .get('/logout', ctx => {
    ctx.logout()
    ctx.redirect('/')
  })
  .get('/auth/facebook', passport.authenticate('facebook'))
  .get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/app',
    failureRedirect: '/'
  }))
  .get('/auth/twitter', passport.authenticate('twitter'))
  .get('/auth/twitter/callback', passport.authenticate('twitter', {
    successRedirect: '/app',
    failureRedirect: '/'
  }))
  .get('/auth/google', passport.authenticate('google'))
  .get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/app',
    failureRedirect: '/'
  }))
  .post('/custom', (ctx, next) => {
    return passport.authenticate('local', (user, info, status) => {
      if (user === false) {
        ctx.status = 401
        ctx.body = { success: false }
      } else {
        ctx.body = { success: true }
        return ctx.login(user)
      }
    })(ctx, next)
  });

module.exports = {
  routes () {
    return router.routes()
  },
  allowedMethods () {
    return router.allowedMethods()
  }
};
