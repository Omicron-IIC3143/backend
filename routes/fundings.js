const Router = require('koa-router');
const passport = require('koa-passport');

const router = new Router({
	prefix: '/finance'
});


//Get All fundings
router.get('/',passport.authenticate('jwt', { session: false }), async (ctx, next) => {
	try {
		const fundings = await ctx.db.Funding.findAll();
		if (fundings.length === 0){
			throw new Error('We couldn\'t find any finances');
		} else {
			ctx.body = fundings;
			next();
		}
	} catch (ValidationError) {
		ctx.throw(400, `${ValidationError}`);
	}
});


//Get user fundings
router.get('/transactions/:id', passport.authenticate('jwt', { session: false }), async (ctx, next) => {
	try {
		let myFinance = await ctx.db.Funding.findAll({where: {userId: ctx.params.id}});

		if (myFinance.length === 0) {
			throw new Error(`There's no finance linked to the user: ${ctx.params.id}`);
		} else {
			ctx.body = myFinance;
			next();
		}
	} catch (ValidationError) {
		ctx.throw(404, `${ValidationError}`);
	}
});

//Get projects fundings
router.get('/project/:id', passport.authenticate('jwt', { session: false }), async (ctx, next) => {
	try {
		let projectFinance = await ctx.db.Funding.findAll({where: {projectId: ctx.params.id}});

		if (projectFinance.length === 0) {
			throw new Error(`There's no finance linked to the project: ${ctx.params.id}`);
		} else {
			ctx.body = projectFinance;
			next();
		}
	} catch (ValidationError) {
		ctx.throw(404, `${ValidationError}`);
	}
});

//Get funding by id
router.get('/:id', passport.authenticate('jwt', { session: false }), async (ctx, next) => {
	try {
		let getCurrentFinance = await ctx.db.Funding.findAll({where: {id: ctx.params.id}});

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


// Post new funding
router.post('/new', passport.authenticate('jwt', { session: false }), async (ctx) => {
	try {
		const data = ctx.request.body;
		let user = await ctx.db.User.findAll({where: {id: data.userId}});
		let project = await ctx.db.Project.findAll({where: {id: data.projectId}});
		if (user.length === 0){
			throw new Error(`There's no user under the id: ${ctx.request.body.userId}, to make the donation use another id`);
		}
		if (project.length === 0 || project[0].currentState !== 'accepted'){
			throw new Error(`There's no project under the id: ${ctx.request.body.userId}, use an accepted project to finance`);
		}
		if (user[0].money < data.amount) {
			throw new Error(`The user under id: ${user[0].id}, does not have sufficient money`);
		}
		if (data.amount <= 0) {
			throw new Error('Funding cannot have ammount 0 or negative');
		}
		await user[0].update({
			...user[0],
			money: user[0].money - data.amount,
		});
		if (project[0].currentAmount + data.amount >= project[0].goalAmount) {
			await project[0].update({
				...project[0],
				currentAmount: project[0].currentAmount + data.amount,
				currentState: 'completed',
			});
		} else {
			await project[0].update({
				...project[0],
				currentAmount: project[0].currentAmount + data.amount,
			});
		}
		const new_finance = await ctx.db.Funding.build(ctx.request.body);
		await new_finance.save();
		ctx.body = new_finance;
		ctx.response.status = 201;
		ctx.message = 'New finance added';
	} catch (ValidationError) {
		ctx.throw(400, `Couldn't add the new transaction: ${ValidationError}`);
	}
});


// Delete funding by id
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), async (ctx) => {
	try {
		const deleted = await ctx.db.Funding.destroy({where: {id: ctx.params.id}});
		
		if (deleted > 0) {
			ctx.response.status = 200;
			ctx.body = `Finance ${ctx.params.id} deleted`;
		} else {
			throw new Error('Finance not found');
		}
	} catch (ValidationError) {
		ctx.throw(400, `${ValidationError}`);
	}
});


// Update funding by id
router.put('/:id', passport.authenticate('jwt', { session: false }), async (ctx) => {
	try {
		var data = ctx.request.body;
		const update = await ctx.db.Funding.update(data, {where: {id: ctx.params.id}});
		
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