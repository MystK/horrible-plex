console.log('koa.js REST API');
var koa = require('koa');
var router = require('koa-router')();
var stringify = require('./lib/stringify.js');
var header = require('./lib/header.js');
var app = module.exports = koa();

router
	.use(stringify())
	.use(header())
	.get('/',
		function *(next) {
		}
	)
	.get('/media',
		function* (next) {
		}
	)
	.get('/downloads',
		function* (next) {
		}
	);

app
	.use(router.routes())
	.use(router.allowedMethods());

if (!module.parent) app.listen(3000);

var md5sum = require('./lib/md5');
md5sum.calculate('D:\\Media\\Anime', {ignore: /(\.1db$)|(\.ini$)/, output: 'ignored', writeto: 'variable'} ,function (err, data) {
	if (err) throw err;
	console.log(data.length);
});