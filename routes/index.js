const Router = require('koa-router');

const router = new Router({
	prefix: '/'
});

router.get('/', (ctx, next) => {
	// eslint-disable-next-line no-undef
	ctx.body = process.env.VARIABLE;
	next();
});

module.exports = router;