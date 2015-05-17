/**
 * Created by Antoine on 3/7/2015.
 */
//paths
var fs = require('fs');
var paths = {
	anime: 'D:\\Media\\Anime',
	downloads: ['D:\\Downloads\\BooStudioLLC.TorrexPro_b6e429xa66pga!App\\Downloads\\Completed','D:\\Downloads\\Bintube']
};

function readDir(path){
	return fs.readdirSync(path).filter(function (e) {
		return !e.match(/\./);
	});
}