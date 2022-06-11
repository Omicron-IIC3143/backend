const Router = require('koa-router');
const passport = require('koa-passport');

const router = new Router({
	prefix: '/finance'
});


//Get All foundings
router.get('/',passport.authenticate('jwt', { session: false }), async (ctx, next) => {
	try {
		const foundings = await ctx.db.Founding.findAll();
		if (foundings.length === 0){
			throw new Error('We couldn\'t find any finances');
		} else {
			ctx.body = foundings;
			next();
		}
	} catch (ValidationError) {
		ctx.throw(400, `${ValidationError}`);
	}
});


//Get founding by id
router.get('/:id', passport.authenticate('jwt', { session: false }), async (ctx, next) => {
	try {
		let getCurrentFinance = await ctx.db.Founding.findAll({where: {id: ctx.params.id}});

		if (getCurrentFinance.length === 0) {
			throw new Error(`There's no finance under id: ${ctx.params.id}`);
		} else {
			ctx.body = getCurrentFinance[0];
			next();
		}
	} catch (ValidationError) {
		ctx.throw(404, `${ValidationError}`);
	}
});


// Post new founding
router.post('/new', passport.authenticate('jwt', { session: false }), async (ctx) => {
	try {
		let user = await ctx.db.User.findAll({where: {id: ctx.request.body.userId}});
		let project = await ctx.db.Project.findAll({where: {id: ctx.request.body.projectId}});
		if (user.length === 0){
			throw new Error(`There's no user under the id: ${ctx.request.body.userId}, to make the donation use another id`);
		}
		if (project.length === 0){
			throw new Error(`There's no project under the id: ${ctx.request.body.userId}, use a created project to finance`);
		}
		const new_finance = await ctx.db.Founding.build(ctx.request.body);
		await new_finance.save();
		ctx.body = new_finance;
		ctx.response.status = 201;
		ctx.body = 'New finance added:';
	} catch (ValidationError) {
		ctx.throw(400, `Couldn't add the new transaction: ${ValidationError}`);
	}
});


// Delete founding by id
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), async (ctx) => {
	try {
		const deleted = await ctx.db.Founding.destroy({where: {id: ctx.params.id}});
		
		if (deleted > 0) {
			ctx.response.status = 200;
			ctx.body = `finance ${ctx.params.id} deleted`;
		} else {
			throw new Error('finance not found');
		}
	} catch (ValidationError) {
		ctx.throw(400, `${ValidationError}`);
	}
});


// Update founding by id
router.put('/:id', passport.authenticate('jwt', { session: false }), async (ctx) => {
	try {
		var data = ctx.request.body;
		const update = await ctx.db.Founding.update(data, {where: {id: ctx.params.id}});
		
		if (update > 0) {
			ctx.response.status = 200;
			ctx.body = 'Finance updated';
		} else {
			throw new Error('Something is wrong check the parameters');
		}
	} catch (ValidationError) {
		ctx.throw(400, `${ValidationError}`);
	}
});

module.exports = router;