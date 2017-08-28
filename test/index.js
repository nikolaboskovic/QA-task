const app = require('../app');

const supertest = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const should = chai.should;

const api = supertest('http://localhost:3000');

let login = null;
let users = null;
describe('Tests', () => {

	// Login user to the system and fetch access token
	it('Login user', (done) => {
		api.post('/sign-in')
			.send({
				password: 'password',
				email: 'email',
			})
			.then((res) => {
				login = res.body.access_token;
				done();
			}).
			catch(done);
	});
	
	// Don't login user with wrong password
	it('Wrong password', (done) => {
		api.post('/sign-in')
			.send({
				password: 'wrongpassword',
				email: 'email',
			})
			.then((res) => {
				expect(res.body.message).to.be.equal("Wrong password or email")
				done();
			}).
			catch(done);
	});
	
	// Don't login user with wrong email
	it('Wrong email', (done) => {
		api.post('/sign-in')
			.send({
				password: 'password',
				email: 'wrongemail',
			})
			.then((res) => {
				//we expect error message
				expect(res.body.message).to.be.equal("Wrong password or email")
				done();
			}).
			catch(done);
	});
	
	// Don't login user with wrong password and email
	it('Wrong password and email', (done) => {
		api.post('/sign-in')
			.send({
				password: 'wrongpassword',
				email: 'wrongemail',
			})
			.then((res) => {
				//we expect error message
				expect(res.body.message).to.be.equal('Wrong password or email')
				done();
			}).
			catch(done);
	});

	// Get a list of all users
	it('Get users list', (done) => {
		api.get('/users')
			.set('authorization', login)
			.then((res) => {
				// we expect that there is 6 users. You can check/confirm that in app code.
				expect(res.body.length).to.be.equal(6);
				done();
			}).
		catch(done);
	});
	//Get single user
	it('Get single user', (done) => {
		api.get('/users/')
			.set('authorization', login)
			.then((res) => {
				// we expect that there is 6 users. You can check/confirm that in app code.
				expect(res.body.active).to.be.equal(true);
				done();
			}).
		catch(done);
	});
	
	
});