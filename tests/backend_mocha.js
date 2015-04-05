/**
 * Created by Antoine on 3/15/2015.
 */
var app = require('../app.js');
var request = require('supertest').agent(app.listen());
var expect = require('chai').expect;

function test(uri) {
describe('GET '+uri, function(){
	it('respond with json', function(done) {
		request
			.get(uri)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200, done)
	});
	it('should have uri, description, data, and links keys', function(done) {
		request
			.get(uri)
			.expect(function(res){
				expect(res.body).to.have.property('uri');
				expect(res.body).to.have.property('description');
				expect(res.body).to.have.property('data');
				expect(res.body).to.have.property('links');
			})
			.end(function(err){
				if (err) return done(err);
				done();
			})
	})
});
}

test('/');
test('/media');
test('/downloads');