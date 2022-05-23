const Router = require('koa-router');
const bcrypt = require('bcryptjs');
const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;

const options = {
	usernameField: 'email',
	passwordField: 'password'
};

passport.serializeUser((user, done) => {
	console.log('SERIALIZER');
	done(null, {id: user.id, username: user.email});
});

passport.deserializeUser(async (id, done, ctx) => {
	console.log('DESERIALIZER');
	await ctx.db.User.findOne({where: {id}})
		.then((user) => {
			console.log('GOOD DESERIALIZER', user);
			done(null, user);
		})
		.catch((err) => { 
			console.log('BAD DESERIALIZER', err);
			done(err, null); });
});

passport.use(new LocalStrategy(options, async (username, password, done, ctx) => {
	console.log('LOCALSTRATEGY');
	await ctx.db.User.findOne({where: {email: username}})
		.then(async (user) => {
			if (!user) {
				return done(null, false);
			}
			if (!(password === user.password)) {
				return done(null, false);
			} else {
				console.log('WORKED, NOW RETURNING USER');
				return done(null, user);
			}
		})
		.catch((err) => { 
			console.log(err, 'LOCAL STRATEGY ERROR');
			return done(err);
		});
}));

// Prefix all routes with: /users
const router = new Router({
	prefix: '/users'
});

// Routes will go here
//Get
router.get('/', async (ctx) => {
	const users = await ctx.db.User.findAll();
	ctx.body = users;
});

//Get id
router.get('/:id', async (ctx) => {
	var param = ctx.params.id; 
	let user = await ctx.db.User.findAll({
		where: {
			id: param
		},});
	if (user.length === 0){
		ctx.response.status = 404;
		ctx.body = 'there\'s no user under that id';
	}else {
		ctx.body = user;
	}
});

//Post
router.post('/new', async (ctx, next) => {
	try {
		const body = ctx.request.body;
		const salt = bcrypt.genSaltSync();
		const hash = bcrypt.hashSync(body.password, salt);
		body.password = hash;
		const user = await ctx.db.User.build(body);
		await user.save();
		
		/* passport.authenticate('local', {
			successReturnToOrRedirect: '/',
			failureRedirect: '/login',
			failureMessage: true
		}); */



		/* passport.authenticate('local', function (error, user, info) {
			if (error) {
				ctx.response.status = 401;
				ctx.body = error;
			} else if (!user) {
				ctx.response.status = 401;
				ctx.body = info;
			} else {
				ctx.response.status = 200;
				ctx.body = info;
				//ctx.redirect('/status');
				//next();
			}
	
			// res.status(401).send(info);
		})(ctx, next); */

		/* passport.authenticate('local', { failureRedirect: '/new', failureMessage: true })(ctx, next).then(async (req, res) => {
			console.log('RESPONSE MESSAGE', ctx.response.message);	
			if (ctx.response.message === 'Found') {
				ctx.redirect('/status');
			} else {
				ctx.status = 400;
				ctx.body = { status: 'error' };
			}
		}); */
	} catch (ValidationError) {
		ctx.throw(400, `The parameters you have given are not valid, here is the error ${ValidationError}`)(next);
	}
});

// AUTH
router.get('/login', async (ctx) => {
	if (!ctx.isAuthenticated()) {
		ctx.body = 'You are authenticated';
		ctx.response.status = 200;
	} else {
		ctx.redirect('/status');
	}
});

/* router.post('/login', async (ctx) => {
	return passport.authenticate('local', (err, user, info, status) => {
		if (user) {
			ctx.login(user);
			ctx.redirect('/users/status');
		} else {
			ctx.status = 400;
			ctx.body = { status: 'error' };
		}
	})(ctx);
}); */

router.post('/login', async (ctx) => {() => {
	console.log('HERE IN POST LOGIN');
	passport.authenticate('local', { failureRedirect: '/login', failureMessage: true })(ctx).then((req, res) => {
		ctx.redirect('/status');
	});
};
});

router.get('/status', async (ctx) => {
	try {
		console.log('HERE IN STATUS');
		if (ctx.isAuthenticated()) {
			console.log('status, auth yes');
			ctx.body = 'You are authenticated';
			ctx.response.status = 200;
		}
	} catch (ValidationError) {
		ctx.throw(400, `You are not authenticated. Please log in to access the application. ${ValidationError}`);
		ctx.redirect('/login');
	}
});

router.get('/logout', async (ctx) => {
	if (ctx.isAuthenticated()) {
		ctx.logout();
		ctx.redirect('/login');
	} else {
		ctx.body = { success: false };
		ctx.throw(401);
	}
});

module.exports = router;