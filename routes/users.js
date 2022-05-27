/* eslint-disable no-undef */
const Router = require('koa-router');
const bcrypt = require('bcryptjs');
const passport = require('koa-passport');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

// Prefix all routes with: /users
const router = new Router({
	prefix: '/users'
});

// Routes will go here
//Get
router.get('/', passport.authenticate('jwt', { session: false }), async (ctx, next) => {
	const users = await ctx.db.User.findAll();
	ctx.body = users;
	next();
});

//Get id
router.get('/:id', passport.authenticate('jwt', { session: false }), async (ctx, next) => {
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
router.post('/new', async (ctx) => {
	try{
		const body = ctx.request.body;
		const oldUser = await ctx.db.User.findOne({where: {email: body.email}});
		
		if (oldUser) {
			ctx.response.status = 403;
			ctx.body = 'Error: Email already in use';
		} else {
			const salt = bcrypt.genSaltSync();
			const hash = bcrypt.hashSync(body.password, salt);
			body.password = hash;
			const user = await ctx.db.User.build(body);
			await user.save();

			const token = jwt.sign(body, secret, {subject: user.id.toString()});

			ctx.token = token;
			ctx.response.status = 200;
			ctx.body = {user, token};
		}

	} catch (ValidationError) {
		ctx.throw(400, `The parameters you have given are not valid, here is the error ${ValidationError}`);
	}
});


router.post('/login', async (ctx) => {
	const body = ctx.request.body;
	const user = await ctx.db.User.findOne({where: {email: body.email}});

	if (!user) {
		ctx.response.status = 401;
		ctx.body = 'Error: User does not exist.';
	} else {
		const passwordMatch = bcrypt.compareSync(body.password, user.password);

		if (!passwordMatch) {
			ctx.response.status = 401;
			ctx.body = 'Error: Incorrect password.';
		} else {
			const token = jwt.sign(body, secret, {subject: user.id.toString()});
	
			ctx.token = token;
			ctx.response.status = 200;
			ctx.body = {user, token};
		}
	}
});

module.exports = router;