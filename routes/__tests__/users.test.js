/* eslint-disable no-undef */
const supertest = require('supertest');
const app = require('../../app');

const request = supertest(app.callback());

const baseUrl = '/users';

describe('Users Test Suite', function() {
	const user = {
		name: 'jest test',
		rut: '12345',
		email: 'jest_testing@email.com',
		password: 'jest_password',
		money: 0,
		pictureUrl: 'some picture url',
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
	test('get seed users', async () => {
		// Setup for this test specifically.
		const response = await request
			.get(`${baseUrl}`)
			.set('Content-type', 'application/json')
			.set('Authorization', `Bearer ${jwt}`);

		const seedUsers = response.body;

		// Test
		expect(response.status).toBe(200);
		seedUsers.map((seedUser) => {
			if (seedUser.id == 1) {
				expect(seedUser.name).toBe('Deleted_user');
			} else if (seedUser.id == 2) {
				expect(seedUser.name).toBe('vicho');
			} else if (seedUser.id == 3) {
				expect(seedUser.name).toBe('anto');
			}
		});
	});
	test('get user by id', async () => {
		// Setup for this test specifically.
		const response = await request
			.get(`${baseUrl}/1`)
			.set('Content-type', 'application/json')
			.set('Authorization', `Bearer ${jwt}`);

		// Test
		expect(response.status).toBe(200);
		expect(response.body.name).toBe('Deleted_user');
	});
	test('get user projects', async () => {
		// Setup for this test specifically.
		const response = await request
			.get(`${baseUrl}/2/projects`)
			.set('Content-type', 'application/json')
			.set('Authorization', `Bearer ${jwt}`);

		const userProjects = response.body;

		// Test
		expect(response.status).toBe(200);
		userProjects.map((userProject) => {
			if (userProject.id == 1) {
				expect(userProject.name).toBe('Teleton');
			} else if (userProject.id == 2) {
				expect(userProject.name).toBe('Colecta Social');
			}
		});
	});
	test('user login', async () => {
		// Setup for this test specifically.
		const loginUser = {
			email: 'jest_testing@email.com',
			password: 'jest_password'
		};

		const response = await request
			.post(`${baseUrl}/login`)
			.set('Content-type', 'application/json')
			.send(loginUser);

		// Test
		expect(response.status).toBe(200);
		expect(response.body.user.name).toBe(user.name);
	});
	test('edit user', async () => {
		// Setup for this test specifically.
		const editUser = {
			name: 'edited name',
			rut: '12345',
			email: 'jest_testing@email.com',
			password: 'jest_password',
			money: 0,
			pictureUrl: 'some picture url',
			description: 'some testing description'
		};

		const response = await request
			.put(`${baseUrl}/${id}`)
			.set('Content-type', 'application/json')
			.set('Authorization', `Bearer ${jwt}`)
			.send(editUser);

		// Test
		expect(response.status).toBe(200);
		expect(response.body.user.name).toBe(editUser.name);
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