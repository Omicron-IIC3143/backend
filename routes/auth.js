const Router = require('koa-router');
const passport = require('koa-passport');
const userRoutes = require('./users');

// Prefix all routes with: /users
const router = new Router({
	prefix: '/auth'
});

/* router.get('/auth/register', async (ctx) => {
	ctx.type = 'html';
	ctx.body = fs.createReadStream('./src/server/views/register.html');
});j
 */

router.post('/register', async (ctx) => {
	const user = ctx.redirect('/users/new', userRoutes);
	return(passport.authenticate('local', (err,	user, info, status) => {
		if (user) {
			ctx.login(user);
			ctx.redirect('/auth/status');
		} else {
			ctx.status = 400;
			ctx.body = { status: 'error' };
		}
	})(ctx));
});

router.get('status', async (ctx) => {
	try {
		if (ctx.isAuthenticated()) {
			ctx.body = 'You are authenticated';
			ctx.response.status = 200;
			
		}
	} catch (ValidationError) {
		ctx.throw(400, `You are not authenticated. Please log in to access the application. ${ValidationError}`);
		//ctx.redirect('/auth/login');
	}
});

module.exports = router;