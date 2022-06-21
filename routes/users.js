const Router = require('koa-router');
const bcrypt = require('bcryptjs');
const passport = require('koa-passport');
const jwt = require('jsonwebtoken');

// eslint-disable-next-line no-undef
const secret = process.env.JWT_SECRET;
const router = new Router({
	prefix: '/users'
});

// Get all users
router.get('/', passport.authenticate('jwt', { session: false }), async (ctx, next) => {
	try {
		const users = await ctx.db.User.findAll();
		if (users.length === 0) {
			throw new Error('We couldn\'t find any users');
		} else {
			ctx.body = users;
			next();
		}
	} catch (ValidationError) {
		ctx.throw(404, `${ValidationError}`);
	}
});

// Get user by id
router.get('/:id', passport.authenticate('jwt', { session: false }), async (ctx, next) => {
	try{
		let user = await ctx.db.User.findAll({where: {id: ctx.params.id}});
		if (user.length === 0) {
			throw new Error(`There's no user under id: ${ctx.params.id}`);
		} else {
			ctx.body = user[0];
			next();
		}
	}catch (ValidationError) {
		ctx.throw(404, `${ValidationError}`);
	}
});

// Get user projects by id
router.get('/:id/projects', passport.authenticate('jwt', { session: false }), async (ctx, next) => {
	try{
		const userProjects = await ctx.db.User.findByPk(ctx.params.id, {
			include: [ctx.db.Project]
		});
		if (!userProjects) {
			throw new Error(`User with id: ${ctx.params.id} does not exist`);
		} else {
			if (userProjects.Projects.length) {
				ctx.body = userProjects.Projects;
				next();
			} else {
				throw new Error(`User with id: ${ctx.params.id} has no projects`);
			}
		}
	}catch (ValidationError) {
		ctx.throw(404, `${ValidationError}`);
	}
});

// Register new user
router.post('/register', async (ctx) => {
	try {
		const body = ctx.request.body;
		const oldUser = await ctx.db.User.findOne({where: {email: body.email}});
		if (oldUser) {
			ctx.response.status = 403;
			ctx.body = 'Error: Email already in use';
		} else {
			const salt = bcrypt.genSaltSync();
			const hash = bcrypt.hashSync(body.password, salt);
			body.password = hash; 
			const user = await ctx.db.User.build(body);
			await user.save();
			const token = jwt.sign(body, secret, {subject: user.id.toString()});
			ctx.token = token;
			ctx.response.status = 201;
			ctx.body = {user, token};
		}
	} catch (ValidationError) {
		console.log(ValidationError);
		ctx.throw(404, 'Couldn\'t add the new user');
	}
});

// Login user
router.post('/login', async (ctx) => {
	const body = ctx.request.body;
	const user = await ctx.db.User.findOne({where: {email: body.email}});
	if (!user) {
		ctx.response.status = 404;
		ctx.body = 'Error: User does not exist.';
	} else {
		console.log(body.password, user.password);
		const passwordMatch = bcrypt.compareSync(body.password, user.password);
		if (!passwordMatch) {
			ctx.response.status = 403;
			ctx.body = 'Error: Incorrect password.';
		} else {
			const token = jwt.sign(body, secret, {subject: user.id.toString()});
			ctx.token = token;
			ctx.response.status = 200;
			ctx.body = {user, token};
		}
	}
});

// Delete a user by id
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), async (ctx) => {
	try {
		let old = await ctx.db.User.findOne({where: {id: ctx.params.id}});
		if (old){
			let user = await ctx.db.User.findOne({where: {email: 'deleted@uc.cl'}});
			let projects = await ctx.db.Project.findAll({where: {userId: ctx.params.id}});
			let fundings = await ctx.db.Funding.findAll({where: {userId: ctx.params.id}});
			if (projects.length > 0) {
				projects.map(async (proj) => {
					return await ctx.db.Project.update({userId: user.dataValues.id, currentState: 'deleted'}, {where: {id: proj.dataValues.id}});
				});
			}
			if (fundings.length > 0) {
				fundings.map(async (fin) => {
					return await ctx.db.Funding.update({userId: user.dataValues.id}, {where: {id: fin.dataValues.id}});
				});
			}
			try {				
				let deleted = await ctx.db.User.destroy({where: {id: ctx.params.id}});
				if (deleted > 0) {
					ctx.response.status = 200;
					ctx.body = `User ${ctx.params.id} deleted`;
				}
			} finally {
				await ctx.db.User.destroy({where: {id: ctx.params.id}});
			}
		}else {
			throw new Error('User not found');
		}
	} catch (ValidationError) {
		console.log(ValidationError.message);
		let old = await ctx.db.User.findOne({where: {id: ctx.params.id}});
		if (old){
			ctx.throw(404, ValidationError);
		}else{
			if (ValidationError.message === 'User not found'){
				ctx.throw(404, ValidationError);
			}else{
				console.log('desde catch');
				ctx.throw(200, `User ${ctx.params.id} deleted`);
			}
		}
	}
});

// Update user by id
router.put('/:id', passport.authenticate('jwt', { session: false }), async (ctx) => {
	try{
		var data = ctx.request.body;
		if (data.password) {
			const salt = bcrypt.genSaltSync();
			const hash = bcrypt.hashSync(data.password, salt);
			data.password = hash;
		}
		const update = await ctx.db.User.update(data, {where: {id: ctx.params.id}});
		if (update > 0) {
			const updated_user = await ctx.db.User.findOne({where: {id: ctx.params.id}});
			ctx.body = {user: updated_user};
			ctx.response.status = 200;
		} else {
			throw new Error('Something is wrong check the parameters');
		}
	} catch (ValidationError) {
		ctx.throw(400, `${ValidationError}`);
	}
});

module.exports = router;