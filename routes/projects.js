const Router = require('koa-router');

// Prefix all routes with: /books
const router = new Router({
	prefix: '/projects'
});

// Routes will go here
//Get All Projects
router.get('/', async (ctx, next) => {
	const projects = await ctx.db.Project.findAll();
	console.log(projects);
	ctx.body = projects;
	next();
});

//Get id
router.get('/:id', async (ctx, next) => {
	let getCurrentProject = await ctx.db.Project.findAll({
		where: {
			id: ctx.params.id,
		},
	});
	if (getCurrentProject.length) {
		ctx.body = getCurrentProject[0];
	} else {
		ctx.response.status = 404;
		ctx.body = 'Project Not Found';
	}
	next();
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
		ctx.body = `New user added: ${new_project}`;
	} catch (ValidationError) {
		ctx.throw(400, `The parameters you have given are not valid, here is the error ${ValidationError}`);
	}
});

module.exports = router;