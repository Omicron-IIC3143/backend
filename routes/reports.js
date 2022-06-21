const Router = require('koa-router');
const passport = require('koa-passport');

const router = new Router({
	prefix: '/reports'
});

// Get all reports
router.get('/', passport.authenticate('jwt', { session: false }), async (ctx, next) => {
	try {
		const reports = await ctx.db.Reports.findAll();
		if (reports.length === 0) {
			throw new Error('We couldn\'t find any reports');
		} else {
			ctx.body = reports;
			next();
		}
	} catch (ValidationError) {
		ctx.throw(404, `${ValidationError}`);
	}
});

// Get report by id
router.get('/:id', passport.authenticate('jwt', { session: false }), async (ctx, next) => {
	try {
		let report = await ctx.db.Reports.findAll({where: {id: ctx.params.id}});
		if (report.length === 0){
			throw new Error(`There's no report under id: ${ctx.params.id}`);
		} else {
			ctx.body = report[0];
			next();
		}
	} catch (ValidationError) {
		ctx.throw(404, `${ValidationError}`);
	}
});

// Post new report
router.post('/new', passport.authenticate('jwt', { session: false }), async (ctx) => {
	try {
		let project = await ctx.db.Project.findAll({where: {id: ctx.request.body.projectId}});
		if (project.length ===1) {
			const new_report = await ctx.db.Reports.build(ctx.request.body);
			await new_report.save();
			ctx.body = new_report;
			ctx.response.status = 201;
			ctx.message = 'New report added';
		} else {
			throw new Error('Couldn\'t add the new report');
		}
	} catch (ValidationError) {
		ctx.throw(404, `${ValidationError}`);
	}
});

// Delete report by id
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), async (ctx) => {
	try {
		const deleted = await ctx.db.Reports.destroy({where: {id: ctx.params.id}});
		if (deleted > 0) {
			ctx.response.status = 200;
			ctx.body = `Report ${ctx.params.id} deleted`;
		} else {
			throw new Error('Report not found');
		}
	} catch (ValidationError) {
		ctx.throw(404, `${ValidationError}`);
	}
});

// Update report by id
router.put('/:id', passport.authenticate('jwt', { session: false }), async (ctx) => {
	try{
		var data = ctx.request.body;
		let project = await ctx.db.Project.findAll({where: {id: ctx.request.body.projectId}});
		if (project.length ===1) {
			const update = await ctx.db.Reports.update(data, {where: {id: ctx.params.id}});
			if (update > 0) {
				ctx.response.status = 200;
				ctx.body = 'Report updated';
			} else {
				throw new Error('Something is wrong, check the parameters');
			}
		} else {
			throw new Error(`There's no project under the id: ${ctx.request.body.projectId}`);
		}
	} catch (ValidationError) {
		ctx.throw(400, `${ValidationError}`);
	}
});

module.exports = router;