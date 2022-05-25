/* eslint-disable linebreak-style */
const Router = require('koa-router');

// Prefix all routes with: /users
const router = new Router({
	prefix: '/users'
});

// Routes will go here
//Get
router.get('/', async (ctx, next) => {
	try{
		const users = await ctx.db.User.findAll();
		if (users.length === 0){
			throw new Error('We couldn\'t find any users');
		}else{
			ctx.body = users;
			next();
		}
	}catch (ValidationError) {
		ctx.throw(400, `${ValidationError}`);
	}
});

//Get id
router.get('/:id', async (ctx, next) => {
	try{
		let user = await ctx.db.User.findAll({
			where: {
				id: ctx.params.id
			},});
		if (user.length === 0){
			throw new Error(`There's no user under id: ${ctx.params.id}`);
		}else {
			ctx.body = user[0];
			next();
		}
	}catch (ValidationError) {
		ctx.throw(404, `${ValidationError}`);
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
		ctx.throw(400, 'Couldn\'t add the new user');
	}
});

router.delete('/delete/:id', async (ctx) => {
	try {
		const deleted = await ctx.db.User.destroy({
			where: {
				id: ctx.params.id
			},});
		if (deleted > 0) {
			ctx.response.status = 200;
			ctx.body = `User ${ctx.params.id} deleted`;
		}
		else{
			throw new Error('User not found');
		}
	} catch (ValidationError) {
		ctx.throw(400, `${ValidationError}`);
	}
});

router.put('/:id', async (ctx) => {
	// eslint-disable-next-line no-unused-vars
	try{
		var data = ctx.request.body;
		const update = await ctx.db.User.update(data, {
			where: {
				id: ctx.params.id
			},});
		if (update > 0){
			ctx.response.status = 200;
			ctx.body = 'User updated';
		}else{
			throw new Error('Something is wrong check the parameters');
		}
	} catch (ValidationError) {
		ctx.throw(400, `${ValidationError}`);
	}
});

module.exports = router;