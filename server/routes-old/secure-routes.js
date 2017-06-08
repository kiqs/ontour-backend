//Secures routes
const Router = require('koa-router');
const securedRouter = new Router();

//Middleware: authed
function *authed(next) {
  if (this.req.isAuthenticated()) {
    yield next;
  } else {
    this.redirect('/auth/github');
  }
}

securedRouter.get('/app', authed, function *() {
  this.body = 'Secured Zone: koa-tutorial\n' + JSON.stringify(this.req.user, null, '\t');
});

module.exports = securedRouter;
