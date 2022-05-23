/* eslint-disable linebreak-style */
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
		ctx.body = 'New user added';
	} catch (ValidationError) {
		ctx.throw(400, `The parameters you have given are not valid, here is the error ${ValidationError}`);
	}
});

router.delete('/delete/:id', async (ctx) => {
	try {
		var param = ctx.params.id;
		const deleted = await ctx.db.User.destroy({
			where: {
				id: param
			},});
		if (deleted > 0) {
			ctx.response.status = 200;
			ctx.body = `User ${param} deleted`;
		}
		else{
			throw new Error('User not found');
		}
	} catch (ValidationError) {
		ctx.throw(400, `The parameters you have given are not valid, here is the error ${ValidationError}`);
	}
});

router.put('/:id', async (ctx) => {
	// eslint-disable-next-line no-unused-vars
	try{
		var param = ctx.params.id;
		var data = ctx.request.body;
		const update = await ctx.db.User.update(data, {
			where: {
				id: param
			},});
		if (update > 0){
			ctx.response.status = 200;
			ctx.body = 'User updated';
		}else{
			throw new Error('Something is wrong');
		}
	} catch (ValidationError) {
		ctx.throw(400, `The parameters you have given are not valid, here is the error ${ValidationError}`);
	}
});

module.exports = router;