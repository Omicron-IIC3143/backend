/* eslint-disable linebreak-style */
const Router = require('koa-router');

// Prefix all routes with: /books
const router = new Router({
	prefix: '/projects'
});

// Routes will go here
//Get All Projects
router.get('/', async (ctx, next) => {
	try{
		const projects = await ctx.db.Project.findAll();
		if (projects.length === 0){
			throw new Error('We couldn\'t find any projects');
		}else{
			ctx.body = projects;
			next();
		}
	}catch (ValidationError) {
		ctx.throw(400, `${ValidationError}`);
	}
});

//Get id
router.get('/:id', async (ctx, next) => {
	try{
		let getCurrentProject = await ctx.db.Project.findAll({
			where: {
				id: ctx.params.id,
			},
		});
		if (getCurrentProject.length === 0) {
			throw new Error(`There's no project under id: ${ctx.params.id}`);
		} else {
			ctx.body = getCurrentProject[0];
			next();
		}
	}catch (ValidationError) {
		ctx.throw(404, `${ValidationError}`);
	}
});

// //Post
//Post
router.post('/new', async (ctx) => {
	// eslint-disable-next-line no-unused-vars
	try{
		const new_project = await ctx.db.Project.build(ctx.request.body);
		await new_project.save();
		ctx.body = new_project;
		ctx.response.status = 201;
		ctx.body = 'New user added:';
	} catch (ValidationError) {
		ctx.throw(400, 'Couldn\'t add the new project');
	}
});

router.delete('/delete/:id', async (ctx) => {
	try {
		const deleted = await ctx.db.Project.destroy({
			where: {
				id: ctx.params.id
			},});
		if (deleted > 0) {
			ctx.response.status = 200;
			ctx.body = `Project ${ctx.params.id} deleted`;
		}
		else{
			throw new Error('Project not found');
		}
	} catch (ValidationError) {
		ctx.throw(400, `${ValidationError}`);
	}
});

router.put('/:id', async (ctx) => {
	// eslint-disable-next-line no-unused-vars
	try{
		var data = ctx.request.body;
		const update = await ctx.db.Project.update(data, {
			where: {
				id: ctx.params.id
			},});
		if (update > 0){
			ctx.response.status = 200;
			ctx.body = 'Project updated';
		}else{
			throw new Error('Something is wrong check the parameters');
		}
	} catch (ValidationError) {
		ctx.throw(400, `${ValidationError}`);
	}
});

module.exports = router;