/**
 * Created by Antoine on 3/8/2015.
 */
var readDir = require('./readDir');

var header = function(futureOptions) {
	return function*(next) {
		var paths = {
			anime: 'D:\\Media\\Anime',
			downloads: 'D:\\Downloads\\BooStudioLLC.TorrexPro_b6e429xa66pga!App\\Downloads\\Completed'
		};
		var body = {
			descriptions: {
				'/': 'Tomahawk Version 1.0.0',
				'/media': 'folders of current media',
				'/downloads': 'files of unsorted downloads',
				'': ''
			},
			data: {
				'/': 'No Data',
				'/media': readDir(paths.anime,{fr: false, regexp:/\./}),
				'/downloads': readDir(paths.downloads,{fr: true, regexp:/\.mkv/}),
				'': ''
			}
		};
		this.body = {
			uri:this.path,
			description: body.descriptions[this.path],
			data: body.data[this.path],
			links: 'Not Implemented'
		};
		yield next
	};
};

module.exports = header;