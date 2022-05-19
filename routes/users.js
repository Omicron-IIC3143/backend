const Router = require('koa-router');

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
router.post('/new', async (ctx) => {
	// eslint-disable-next-line no-unused-vars
	try{
		const new_user = await ctx.db.User.build(ctx.request.body);
		await new_user.save();
		ctx.body = new_user;
		ctx.response.status = 201;
		ctx.body = `New user added: ${new_user}`;
	} catch (ValidationError) {
		ctx.throw(400, `The parameters you have given are not valid, here is the error ${ValidationError}`);
	}
});

module.exports = router;