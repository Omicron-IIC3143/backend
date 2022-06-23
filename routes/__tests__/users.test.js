/* eslint-disable no-undef */
const supertest = require('supertest');
const app = require('../../app');
const jwt = require('jsonwebtoken');
const request = supertest(app.callback());
const secret = process.env.JWT_SECRET;

const baseUrl = '/users';

describe('Users Test Suite', function() {
	let id;
	describe('Happy Paths', function() {
		let jwt;
		const user = {
			name: 'jest test',
			rut: '12345',
			email: 'jest_testing@email.com',
			password: 'jest_password',
			money: 0,
			pictureUrl: 'some picture url',
			description: 'some testing description'
		};
		
		test('register user', async () => {
			const response = await request
				.post(`${baseUrl}/register`)
				.set('Content-type', 'application/json')
				.send(user);
	
			jwt = response.body.token;
			id = response.body.user.id;

			expect(response.status).toBe(201);
		});

		test('get seed users', async () => {
			const response = await request
				.get(`${baseUrl}`)
				.set('Content-type', 'application/json')
				.set('Authorization', `Bearer ${jwt}`);

			const seedUsers = response.body;

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
			const response = await request
				.get(`${baseUrl}/1`)
				.set('Content-type', 'application/json')
				.set('Authorization', `Bearer ${jwt}`);

			expect(response.status).toBe(200);
			expect(response.body.name).toBe('Deleted_user');
		});

		test('get user projects', async () => {
			const response = await request
				.get(`${baseUrl}/2/projects`)
				.set('Content-type', 'application/json')
				.set('Authorization', `Bearer ${jwt}`);
	
			const userProjects = response.body;

			expect(response.status).toBe(200);
			userProjects.map((userProject) => {
				if (userProject.id == 1) {
					expect(userProject.name).toBe('Teleton');
				} else if (userProject.id == 2) {
					expect(userProject.name).toBe('Colecta Social');
				}
			});
		});

		test('get user projects - empty', async () => {
			const response = await request
				.get(`${baseUrl}/${id}/projects`)
				.set('Content-type', 'application/json')
				.set('Authorization', `Bearer ${jwt}`);

			expect(response.status).toBe(404);
		});

		test('user login', async () => {
			const loginUser = {
				email: 'jest_testing@email.com',
				password: 'jest_password'
			};

			const response = await request
				.post(`${baseUrl}/login`)
				.set('Content-type', 'application/json')
				.send(loginUser);

			expect(response.status).toBe(200);
			expect(response.body.user.name).toBe(user.name);
		});

		test('edit user', async () => {
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

			expect(response.status).toBe(200);
			expect(response.body.user.name).toBe(editUser.name);
		});

		test('delete user', async () => {
			const response = await request
				.delete(`${baseUrl}/delete/${id}`)
				.set('Content-type', 'application/json')
				.set('Authorization', `Bearer ${jwt}`);

			expect(response.status).toBe(200);
		});
	});
	describe('User Deleting Border Cases', function () {
		test('delete user with projects and funding', async () => {
			// Setup
			const userBody = {
				name: 'user name testing',
				rut: 'user rut testing',
				email:'usertest@test.cl',
				password: 'test',
				isAdmin: true,
				money: 0,
				pictureUrl: 'test picture url',
				description: ' test description',
				createdAt: new Date(),
			};
			const user = await app.context.db.User.create(userBody);
			const token = jwt.sign(userBody, secret, {subject: user.id.toString()});
			const projectBody = {
				name: 'testing project name',
				description: 'testing project description',
				pictureUrl: 'testing picture url',
				company: 'testing company',
				topic: 'testing topic',
				currentAmount: 1000.0,
				goalAmount: 54020.0,
				currentState: 'pending',
				date: new Date(),
				tags: ['test', 'test2'],
				createdAt: new Date(),
				userId: user.id,
			};
			const project = await app.context.db.Project.create(projectBody);
			const fundingBody = {
				userId: user.id,
				projectId: project.id,
				amount: 100.0,
				createdAt: new Date(),
			};
			await app.context.db.Funding.create(fundingBody);

			// Test
			const response = await request
				.delete(`${baseUrl}/delete/${user.id}`)
				.set('Content-type', 'application/json')
				.set('Authorization', `Bearer ${token}`);

			expect(response.status).toBe(200);
		});
	});

	describe('Errors', function () {
		const body = {
			email: 'vicho@uc.cl',
			password: 'vicho'
		};
		const token = jwt.sign(body, secret, {subject: '2'});

		test('get all user - no validation', async () => {
			const response = await request
				.get(`${baseUrl}/${id}`)
				.set('Content-type', 'application/json');

			expect(response.status).toBe(401);
		});
		test('get user by id - empty', async () => {
			const response = await request
				.get(`${baseUrl}/${id}`)
				.set('Content-type', 'application/json')
				.set('Authorization', `Bearer ${token}`);

			expect(response.status).toBe(404);
		});
		test('get user projects - no user', async () => {
			const response = await request
				.get(`${baseUrl}/${id}/projects`)
				.set('Content-type', 'application/json')
				.set('Authorization', `Bearer ${token}`);

			expect(response.status).toBe(404);
		});

		test('register user - already registared', async () => {
			const oldUser = {
				name: 'vicho',
				rut: '123',
				email: 'vicho@uc.cl',
				password: 'vicho',
				money: 0,
				pictureUrl: 'hello',
				description: 'description'
			};

			const response = await request
				.post(`${baseUrl}/register`)
				.set('Content-type', 'application/json')
				.send(oldUser);

			expect(response.status).toBe(403);
		});

		test('register user - invalid body', async () => {
			const invalidUser = {
				name: 'vicho',
				rut: '123',
				money: 0,
				pictureUrl: 'hello',
				description: 'description'
			};

			const response = await request
				.post(`${baseUrl}/register`)
				.set('Content-type', 'application/json')
				.send(invalidUser);

			expect(response.status).toBe(404);
		});

		test('user login - no user', async () => {
			const loginUser = {
				email: 'jest_testing@email.com',
				password: 'jest_password'
			};

			const response = await request
				.post(`${baseUrl}/login`)
				.set('Content-type', 'application/json')
				.send(loginUser);

			expect(response.status).toBe(404);
		});

		test('user login - no password match', async () => {
			const loginUser = {
				email: 'vicho@uc.cl',
				password: 'bicho'
			};

			const response = await request
				.post(`${baseUrl}/login`)
				.set('Content-type', 'application/json')
				.send(loginUser);

			expect(response.status).toBe(403);
		});
		test('delete user - no user', async () => {
			const response = await request
				.delete(`${baseUrl}/delete/${id}`)
				.set('Content-type', 'application/json')
				.set('Authorization', `Bearer ${token}`);

			expect(response.status).toBe(404);
		});

		test('edit user - no user', async () => {
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
				.set('Authorization', `Bearer ${token}`)
				.send(editUser);

			expect(response.status).toBe(400);
		});
	});	
});