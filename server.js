/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const passport = require('koa-passport');
const koaBody = require('koa-body');
const cors = require('koa2-cors');
const db = require('./models');
const bcrypt = require('bcryptjs');

require('dotenv').config();

const app = new Koa();
app.context.db = db;

app.use(koaBody()); 
app.use(cors());

/* // sessions
app.keys = ['super-secret-key'];
app.use(session(app));

// body parser
app.use(bodyParser());

// authentication
app.use(passport.initialize());
app.use(passport.session()); */

//require the router here 
let index = require('./routes/index');
let books = require('./routes/books');
let projects = require('./routes/projects');
let user = require('./routes/users');

//use the router here
app.use(books.routes());
app.use(index.routes());
app.use(projects.routes());
app.use(user.routes());


const port = process.env.PORT || 8080;
const host = process.env.HOST;


/* const LocalStrategy = require('passport-local').Strategy;

const options = {
	usernameField: 'email',
	passwordField: 'password'
};

passport.serializeUser((user, done) => {
	console.log('SERIALIZER');
	done(null, {id: user.id, username: user.email});
});

passport.deserializeUser(async (id, done) => {
	console.log('DESERIALIZER');
	await db.User.findOne({where: {id}})
		.then((user) => {
			console.log('GOOD DESERIALIZER', user);
			done(null, user);
		})
		.catch((err) => { 
			console.log('BAD DESERIALIZER', err);
			done(err, null); });
});

passport.use(new LocalStrategy(options, async (username, password, done) => {
	console.log('LOCALSTRATEGY');
	await db.User.findOne({where: {email: username}})
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
})); */

db.sequelize
	.authenticate()
	.then(() => {
		console.log('Connection to the database has been established successfully.');
		app.listen(port, (err) => {
			if (err) {
				return console.error('Failed', err);
			}
			console.log(`Listening on port ${port}`);
			return app;
		});
	})
	.catch((err) => console.error('Unable to connect to the database:', err));

//app.listen(port, host);
console.log('Aplication is running');