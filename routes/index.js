const Router = require('koa-router');

const router = new Router({
	prefix: '/'
});

router.get('/', (ctx, next) => {
	ctx.body = process.env.VARIABLE;
	next();
});

module.exports = router;