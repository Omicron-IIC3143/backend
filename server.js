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

// sessions
app.keys = ['super-secret-key'];
app.use(session(app));

// body parser
app.use(bodyParser());

// authentication
app.use(passport.initialize());
app.use(passport.session());

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


const LocalStrategy = require('passport-local').Strategy;

const options = {
	usernameField: 'email',
	passwordField: 'password'
};

function comparePass(userPassword, databasePassword) {
	return bcrypt.compareSync(userPassword, databasePassword);
}

passport.serializeUser((user, done) => { 
	console.log('here, SERIALIZER');
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	console.log('here, DESERIALIZER');
	db.User.findOne({where: {id}})
		.then((user) => { done(null, user); })
		.catch((err) => { done(err, null); });
});

passport.use(new LocalStrategy(options, (username, password, done) => {
	console.log('here, LOCALSTRATEGY');
	db.User.findOne({where: {email: username}})
		.then((user) => {
			if (!user) return done(null, false);
			if (!comparePass(password, user.password)) {
				return done(null, false);
			} else {
				return done(null, user);
			}
		})
		.catch((err) => { return done(err); });
}));

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