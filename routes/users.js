const Router = require('koa-router');
const bcrypt = require('bcryptjs');
const passport = require('koa-passport');

// Prefix all routes with: /users
const router = new Router({
	prefix: '/users'
});

// Routes will go here
//Get
router.get('/', async (ctx, next) => {
	const users = await ctx.db.User.findAll();
	ctx.body = users;
	next();
});

//Get id
router.get('/:id', async (ctx, next) => {
	var param = ctx.params.id; 
	let user = await ctx.db.User.findAll({
		where: {
			id: param
		},});
	if (user.length === 0){
		ctx.response.status = 404;
		ctx.body = 'there\'s no user under that id';
		next();
	}else {
		ctx.body = user;
		next();
	}
});

//Post
router.post('/new', async (ctx, next) => {
	try{
		const body = ctx.request.body;
		const salt = bcrypt.genSaltSync();
		const hash = bcrypt.hashSync(body.password, salt);
		body.password = hash;
		const user = await ctx.db.User.build(body);
		await user.save();
		
		return passport.authenticate('local', (err, user, info, status) => {
			if (user) {
				ctx.login(user);
				ctx.redirect('/users/status');
			} else {
				ctx.status = 400;
				ctx.body = { status: 'error' };
			}
		})(ctx);

		/* const z = (err, user, info, status) => {
			if (user) {
				ctx.login(user);
				ctx.redirect('/status');
			} else {
				ctx.status = 400;
				ctx.body = { status: 'error' };
			}
		}; */

		/* ctx.body = new_user;
		ctx.response.status = 201;
		ctx.body = `New user added: ${new_user}`;
		
		next();
		return passport.authenticate('local', z(null, new_user, null, null))(ctx);
		 */
	} catch (ValidationError) {
		ctx.throw(400, `The parameters you have given are not valid, here is the error ${ValidationError}`);
		
	}
	next();
});


// AUTH
router.get('/login', async (ctx, next) => {
	if (!ctx.isAuthenticated()) {
		ctx.body = 'You are authenticated';
		ctx.response.status = 200;
	} else {
		ctx.redirect('/users/status');
	}
	next();
});

router.post('/login', async (ctx) => {
	return passport.authenticate('local', (err, user, info, status) => {
		if (user) {
			ctx.login(user);
			ctx.redirect('/users/status');
		} else {
			ctx.status = 400;
			ctx.body = { status: 'error' };
		}
	})(ctx);
});

router.get('/status', async (ctx, next) => {
	try {
		if (ctx.isAuthenticated()) {
			ctx.body = 'You are authenticated';
			ctx.response.status = 200;
		}
	} catch (ValidationError) {
		ctx.throw(400, `You are not authenticated. Please log in to access the application. ${ValidationError}`);
		ctx.redirect('/users/login');
	}
	next();
});

router.get('/logout', async (ctx, next) => {
	if (ctx.isAuthenticated()) {
		ctx.logout();
		ctx.redirect('/users/login');
	} else {
		ctx.body = { success: false };
		ctx.throw(401);
	}
	next();
});

module.exports = router;