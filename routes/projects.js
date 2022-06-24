const Router = require('koa-router');
const passport = require('koa-passport');

const router = new Router({
	prefix: '/projects'
});

//Get All Projects
router.get('/', async (ctx, next) => {
	try {
		const projects = await ctx.db.Project.findAll();
		if (projects.length === 0){
			throw new Error('We couldn\'t find any projects');
		} else {
			ctx.body = projects;
			next();
		}
	} catch (ValidationError) {
		ctx.throw(404, `${ValidationError}`);
	}
});

//Get project by id
router.get('/:id', async (ctx, next) => {
	try {
		let getCurrentProject = await ctx.db.Project.findAll({where: {id: ctx.params.id}});
		if (getCurrentProject.length === 0) {
			throw new Error(`There's no project under id: ${ctx.params.id}`);
		} else {
			ctx.body = getCurrentProject[0];
			next();
		}
	} catch (ValidationError) {
		ctx.throw(404, `${ValidationError}`);
	}
});

// Post new project
router.post('/new', passport.authenticate('jwt', { session: false }), async (ctx) => {
	try {
		let user = await ctx.db.User.findAll({where: {id: ctx.request.body.userId}});
		if (user.length === 0){
			throw new Error(`There's no user under the id: ${ctx.request.body.userId}, to manage this project use another userId`);
		}
		const new_project = await ctx.db.Project.build(ctx.request.body);
		await new_project.save();
		ctx.body = new_project;
		ctx.response.status = 201;
		ctx.message = 'New project added';
	} catch (ValidationError) {
		ctx.throw(404, `Couldn't add the new project: ${ValidationError}`);
	}
});

// Delete project by id
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), async (ctx) => {
	try {
		const updated = await ctx.db.Project.update({currentState: 'deleted'}, {where: {id: ctx.params.id}});
		if (updated > 0) {
			ctx.response.status = 200;
			ctx.message = `Project ${ctx.params.id} deleted`;
		} else {
			throw new Error('Project not found');
		}
	} catch (ValidationError) {
		ctx.throw(404, `${ValidationError}`);
	}
});

// Update project by id
router.put('/:id', passport.authenticate('jwt', { session: false }), async (ctx) => {
	try {
		var data = ctx.request.body;
		const update = await ctx.db.Project.update(data, {where: {id: ctx.params.id}});
		if (update > 0) {
			ctx.response.status = 200;
			ctx.message = 'Project updated';
			ctx.body = data;
		} else {
			throw new Error('Something is wrong check the parameters');
		}
	} catch (ValidationError) {
		ctx.throw(400, `${ValidationError}`);
	}
});

// Get project report by id
router.get('/:id/report', async (ctx, next) => {
	try{
		const projectReport = await ctx.db.Project.findByPk(ctx.params.id, {
			include: [ctx.db.Reports]
		});
		
		if (!projectReport) {
			throw new Error(`Project with id: ${ctx.params.id} does not exist.`);
		} else {
			//console.log(Object.keys(projectReport.Report));
			if (projectReport.Reports.length) {
				ctx.body = projectReport.Reports;
				next();
			} else {
				ctx.body = [];
				ctx.message = `Project with id: ${ctx.params.id} has no reports.`;
				next();
			}
		}
	}catch (ValidationError) {
		ctx.throw(404, `${ValidationError}`);
	}
});

module.exports = router;