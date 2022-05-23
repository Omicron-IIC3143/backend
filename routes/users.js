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
router.post('/auth/new', async (ctx) => {
	try{
		const body = ctx.request.body;
		const salt = bcrypt.genSaltSync();
		const hash = bcrypt.hashSync(body.password, salt);
		body.password = hash;
		const user = await ctx.db.User.build(body);
		await user.save();

		

		return await passport.authenticate('local', function (error, user, info) {
			console.log('HEREEEE AUTH!');
			if (error) {
				ctx.response.status = 401;
				ctx.body = error;
			} else if (!user) {
				ctx.response.status = 401;
				ctx.body = info;
			} else {
				ctx.response.status = 201;
				ctx.body = `New user added: ${user.name}`;
			}
		})(ctx);

	} catch (ValidationError) {
		ctx.throw(400, `The parameters you have given are not valid, here is the error ${ValidationError}`);
	}
});


router.post('/auth/login', async (ctx) => {
	console.log('HERE IN POST LOGIN');
	return await passport.authenticate('local', function (error, user, info) {
		if (error) {
			ctx.response.status = 401;
			ctx.body = error;
		} else if (!user) {
			ctx.response.status = 401;
			ctx.body = info;
		} else {
			ctx.response.status = 200;
			ctx.body = `${user.name}`;
		}
	})(ctx);
});

router.get('/auth/status', async (ctx) => {
	console.log('HERE IN STATUS');
	if (ctx.isAuthenticated()) {
		ctx.body = 'You are authenticated';
		ctx.response.status = 200;
	} else {
		ctx.throw(400, 'You are not authenticated. Please log in to access the application.');
	}
	
});


router.post('/auth/logout', async (ctx) => {
	console.log(ctx.isAuthenticated());
	if (ctx.isAuthenticated()) {
		console.log('LOG OUT');
		ctx.logout();
	} else {
		ctx.body = { success: false };
		ctx.throw(401);
	}
});

module.exports = router;