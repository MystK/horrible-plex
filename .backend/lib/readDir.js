/**
 * Created by Antoine on 3/8/2015.
 */
var fs = require('fs');
readDir = function(path,options){
	var folders = fs.readdirSync(path)
		.filter(function (e) {
			if (options.fr) return e.match(options.regexp);
			else return !e.match(options.regexp);
		});
	var temp = [];
	for (var i of folders) temp.push({name: i})
	return temp
};

module.exports = readDir;