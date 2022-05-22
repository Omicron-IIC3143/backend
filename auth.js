const passport = require('koa-passport');
const db = require('./models');
const LocalStrategy = require('passport-local').Strategy;

const options = {
	usernameField: 'email',
	passwordField: 'password'
};

passport.serializeUser((user, done) => { done(null, user.id); });

passport.deserializeUser((id, done) => {
	return db.User.where({id}).first()
		.then((user) => { done(null, user); })
		.catch((err) => { done(err,null); });
});

passport.use(new LocalStrategy(options, (username, password, done) => {
	db.User.where({ username }).first()
		.then((user) => {
			if (!user) return done(null, false);
			if (password === user.password) {
				return done(null, user);
			} else {
				return done(null, false);
			}
		})
		.catch((err) => { return done(err); });
}));