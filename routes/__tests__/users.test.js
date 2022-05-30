/* eslint-disable no-undef */
const supertest = require('supertest');
// const db = require('../../models');
const app = require('../../app');

const request = supertest(app.callback());

const baseUrl = '/users';

// .set('Authorization', `Bearer ${}`);

describe('Users Test Suite', function() {
	const user = {
		name: 'jest test',
		rut: '12345',
		email: 'jest_testing11@email.com',
		password: 'jest_password',
		money: 0,
		picture: 'some picture url',
		description: 'some testing description'
	};
	let jwt;
	let id;
	test('register user', async () => {
		// Setup for this test specifically.
		const response = await request
			.post(`${baseUrl}/register`)
			.set('Content-type', 'application/json')
			.send(user);

		jwt = response.body.token;
		id = response.body.user.id;
		console.log(jwt);
		// Test
		expect(response.status).toBe(200);
	});
	test('delete user', async () => {
		// // Setup for this test specifically.
		const response = await request
			.delete(`${baseUrl}/delete/${id}`)
			.set('Content-type', 'application/json')
			.set('Authorization', `Bearer ${jwt}`);

		// Test
		expect(response.status).toBe(200);
	});
});