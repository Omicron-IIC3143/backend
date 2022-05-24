/* eslint-disable linebreak-style */
const Router = require('koa-router');

// Prefix all routes with: /users
const router = new Router({
	prefix: '/reports'
});

// Routes will go here
//Get
router.get('/', async (ctx, next) => {
	try{
		const reports = await ctx.db.Reports.findAll();
		if (reports.length === 0){
			throw new Error('We couldn\'t find any reports');
		}else{
			ctx.body = reports;
			next();
		}
	}catch (ValidationError) {
		ctx.throw(400, `${ValidationError}`);
	}
});

//Get id
router.get('/:id', async (ctx, next) => {
	try{
		var param = ctx.params.id; 
		let report = await ctx.db.Reports.findAll({
			where: {
				id: param
			},});
		if (report.length === 0){
			throw new Error(`There's no report under id: ${param}`);
		}else {
			ctx.body = report;
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
		let project = await ctx.db.Project.findAll({
			where: {
				id: ctx.request.body.projectId,
			},
		});
		if (project.length ===1){
			const new_report = await ctx.db.Reports.build(ctx.request.body);
			await new_report.save();
			ctx.body = new_report;
			ctx.response.status = 201;
			ctx.body = 'New report added';
		}else{
			throw new Error(`There's no project under the id: ${ctx.request.body.projectId}`);
		}
	} catch (ValidationError) {
		ctx.throw(400, `${ValidationError}`);
	}
});

router.delete('/delete/:id', async (ctx) => {
	try {
		var param = ctx.params.id;
		const deleted = await ctx.db.Reports.destroy({
			where: {
				id: param
			},});
		if (deleted > 0) {
			ctx.response.status = 200;
			ctx.body = `Report ${param} deleted`;
		}
		else{
			throw new Error('Report not found');
		}
	} catch (ValidationError) {
		ctx.throw(400, `${ValidationError}`);
	}
});

router.put('/:id', async (ctx) => {
	// eslint-disable-next-line no-unused-vars
	try{
		var param = ctx.params.id;
		var data = ctx.request.body;
		let project = await ctx.db.Project.findAll({
			where: {
				id: ctx.request.body.projectId,
			},
		});
		if (project.length ===1){
			const update = await ctx.db.Reports.update(data, {
				where: {
					id: param
				},});
			if (update > 0){
				ctx.response.status = 200;
				ctx.body = 'Report updated';
			}else{
				throw new Error('Something is wrong, check the parameters');
			}
		}else{
			throw new Error(`There's no project under the id: ${ctx.request.body.projectId}`);
		}
	} catch (ValidationError) {
		ctx.throw(400, `${ValidationError}`);
	}
});

module.exports = router;