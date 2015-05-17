/**
 * Created by Antoine on 3/8/2015.
 */
var stringify = function(futureOptions) {
	return function* (next){
		yield next;
		this.body = JSON.stringify(this.body,null,2)
	};
};

module.exports = stringify;