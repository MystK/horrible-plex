(function(){
	var fs = require('fs');

	var paths = {
		anime: 'D:\\Media\\Anime',
		downloads: 'D:\\Downloads\\BooStudioLLC.TorrexPro_b6e429xa66pga!App\\Downloads\\Completed'
	};

	var app = angular.module('app', []);

	app.controller('ServerController', ['$http', function($http){
		this.checkValidID = function(){

		};
		var database = this;
		//database.folders=[];
		$http.get('http://localhost:3000/media').success(function(data) {
			database.folders = data.data;
		});
		$http.get('http://localhost:3000/downloads').success(function(data) {
			database.files = data.data;
		});
		//this.files=this.readDir(paths.downloads,{fr: true, regexp:/\.mkv/});
	}]);
})();
