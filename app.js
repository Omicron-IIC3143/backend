/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('koa2-cors');
const db = require('./models');
require('dotenv').config();
const passportJWT = require('passport-jwt');
const JwtStrategy   = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const passport = require('koa-passport');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');

const app = new Koa();
app.context.db = db;

app.use(koaBody()); 
app.use(cors());

// sessions
app.use(session(app));

// body parser
app.use(bodyParser());

// authentication
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

passport.use(
	new JwtStrategy(opts, function (jwtPayload, done) {
		return db.User.findByPk(jwtPayload.sub)
			.then(user => { return done(null, user); })
			.catch(err => { return done(err); });
	})
);

app.use(passport.initialize());

//require the router here 
let index = require('./routes/index');
let projects = require('./routes/projects');
let user = require('./routes/users');
let report = require('./routes/reports');
let fundings = require('./routes/fundings');

//use the router here
app.use(index.routes());
app.use(projects.routes());
app.use(user.routes());
app.use(report.routes());
app.use(fundings.routes());

module.exports = app;