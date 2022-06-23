/* eslint-disable no-undef */
const supertest = require('supertest');
const app = require('../../app');
const jwt = require('jsonwebtoken');

const request = supertest(app.callback());
const secret = process.env.JWT_SECRET;
const baseUrl = '/finance';

describe('Funding Test Suite', function() {
	const body = {
		email: 'vicho@uc.cl',
		password: 'vicho'
	};
	const token = jwt.sign(body, secret, {subject: '2'});
	let testFundingId;

	describe('Happy Paths', function () {
		test('get seed fundings', async () => {
			const response = await request
				.get(`${baseUrl}`)
				.set('Content-type', 'application/json')
				.set('Authorization', `Bearer ${token}`);

			const seedFundings = response.body;

			expect(response.status).toBe(200);
			seedFundings.map((seedFunding) => {
				if (seedFunding.id == 1) {
					expect(seedFunding.userId).toBe(3);
				} else if (seedFunding.id == 2) {
					expect(seedFunding.userId).toBe(2);
				}
			});
		});

		test('get funding by id', async () => {
			const response = await request
				.get(`${baseUrl}/1`)
				.set('Content-type', 'application/json')
				.set('Authorization', `Bearer ${token}`);

			expect(response.status).toBe(200);
			expect(response.body.userId).toBe(3);
			expect(response.body.projectId).toBe(1);
			expect(response.body.amount).toBe(100.0);
		});

		test('get fundings of user with id x', async () => {
			const response = await request
				.get(`${baseUrl}/transactions/2`)
				.set('Content-type', 'application/json')
				.set('Authorization', `Bearer ${token}`);

			const transactions = response.body;

			transactions.map((transaction) => {
				expect(transaction.userId).toBe(2);
				expect(transaction.amount).toBeGreaterThan(0);
			});
		});
		test('get fundings of project with id x', async () => {
			const response = await request
				.get(`${baseUrl}/project/3`)
				.set('Content-type', 'application/json')
				.set('Authorization', `Bearer ${token}`);

			const transactions = response.body;

			transactions.map((transaction) => {
				expect(transaction.projectId).toBe(3);
				expect(transaction.amount).toBeGreaterThan(0);
			});
		});

		test('post a new funding', async () => {
			await app.context.db.User.update(
				{
					money: 1000
				},
				{
					where: {
						id: 2,
					}}
			);
			const testFunding = {
				userId: 2,
				projectId: 1,
				amount: 1000.0
			};
			const response = await request
				.post(`${baseUrl}/new`)
				.set('Content-type', 'application/json')
				.set('Authorization', `Bearer ${token}`)
				.send(testFunding);

			expect(response.status).toBe(201);
			testFundingId = response.body.id;
		});
		test('edit funding', async () => {
			const testEditFunding = {
				amount: 150.0
			};

			const response = await request
				.put(`${baseUrl}/${testFundingId}`)
				.set('Content-type', 'application/json')
				.set('Authorization', `Bearer ${token}`)
				.send(testEditFunding);

			expect(response.status).toBe(200);
		});

		test('delete funding', async () => {
			const response = await request
				.delete(`${baseUrl}/delete/${testFundingId}`)
				.set('Content-type', 'application/json')
				.set('Authorization', `Bearer ${token}`);

			expect(response.status).toBe(200);
		});
	});

	describe('Errors', function() {
		test('get funding by id - no funding', async () => {
			const response = await request
				.get(`${baseUrl}/${testFundingId}`)
				.set('Content-type', 'application/json')
				.set('Authorization', `Bearer ${token}`);

			expect(response.status).toBe(404);
		});
		test('get user fundings by id - no validation', async () => {
			const response = await request
				.get(`${baseUrl}/transactions/2`)
				.set('Content-type', 'application/json');

			expect(response.status).toBe(401);
		});
		test('get user fundings by id - user has no fundings', async () => {
			const userBody = {
				name: 'user name testing',
				rut: 'user rut testing',
				email:'usertest@test.cl',
				password: 'test',
				isAdmin: true,
				money: 0,
				pictureUrl: 'test picture url',
				description: ' test description',
			};
			const user = await app.context.db.User.create(userBody);
			const response = await request
				.get(`${baseUrl}/transactions/${user.id}`)
				.set('Content-type', 'application/json')
				.set('Authorization', `Bearer ${token}`);

			expect(response.status).toBe(200);
			expect(response.body).toStrictEqual([]);
			await app.context.db.User.destroy({
				where: {
					id: user.id
				} 
			});
		});
		test('get project fundings by id - no validation', async () => {
			const response = await request
				.get(`${baseUrl}/project/3`)
				.set('Content-type', 'application/json');

			expect(response.status).toBe(401);
		});
		test('get project fundings by id - project has no fundings', async () => {
			const projectBody = {
				name: 'projecto nuevo',
				description: 'Esta es la descripcion del proyecto nuevo',
				pictureUrl: 'url foto de projecto nuevo',
				company: 'new company',
				topic: 'Ayuda social',
				currentAmount: 0,
				goalAmount: 1000,
				currentState: 'pending',
				date: '2022-05-28',
				tags: 'tag-1',
				userId: 1,
			};
			const project = await app.context.db.Project.create(projectBody);
			const response = await request
				.get(`${baseUrl}/project/${project.id}`)
				.set('Content-type', 'application/json')
				.set('Authorization', `Bearer ${token}`);

			expect(response.status).toBe(404);
			await app.context.db.Project.destroy({
				where: {
					id: project.id
				} 
			});
		});
		test('get all fundings - no validation', async () => {
			const response = await request
				.get(`${baseUrl}/${testFundingId}`)
				.set('Content-type', 'application/json');

			expect(response.status).toBe(401);
		});
		test('post funding - no user with id x', async () => {
			const testPostFunding = {
				userId: 0,
				projectId: 1,
				amount: 1000.0
			};

			const response = await request
				.post(`${baseUrl}/new`)
				.set('Content-type', 'application/json')
				.set('Authorization', `Bearer ${token}`)
				.send(testPostFunding);

			expect(response.status).toBe(404);
		});
		test('post funding - no project with id x', async () => {
			const testPostFunding = {
				userId: 1,
				projectId: 0,
				amount: 1000.0
			};

			const response = await request
				.post(`${baseUrl}/new`)
				.set('Content-type', 'application/json')
				.set('Authorization', `Bearer ${token}`)
				.send(testPostFunding);

			expect(response.status).toBe(404);
		});
		test('post funding - user does not have sufficient money', async () => {
			const testPostFunding = {
				userId: 2,
				projectId: 1,
				amount: 10000.0
			};

			const response = await request
				.post(`${baseUrl}/new`)
				.set('Content-type', 'application/json')
				.set('Authorization', `Bearer ${token}`)
				.send(testPostFunding);


			expect(response.status).toBe(404);
		});
		test('post funding - funding with amount 0', async () => {
			const testPostFunding = {
				userId: 2,
				projectId: 1,
				amount: 0.0
			};

			const response = await request
				.post(`${baseUrl}/new`)
				.set('Content-type', 'application/json')
				.set('Authorization', `Bearer ${token}`)
				.send(testPostFunding);


			expect(response.status).toBe(404);
		});
		test('post funding - no validation', async () => {
			const testPostFunding = {
				userId: 1,
				projectId: 0,
				amount: 1000.0
			};

			const response = await request
				.post(`${baseUrl}/new`)
				.set('Content-type', 'application/json')
				.send(testPostFunding);

			expect(response.status).toBe(401);
		});
		test('delete funding - no funding', async () => {
			const response = await request
				.delete(`${baseUrl}/delete/${testFundingId}`)
				.set('Content-type', 'application/json')
				.set('Authorization', `Bearer ${token}`);

			expect(response.status).toBe(404);
		});
		test('edit funding - no funding', async () => {
			const testEditFunding = {
				amount: 150.0
			};

			const response = await request
				.put(`${baseUrl}/${testFundingId}`)
				.set('Content-type', 'application/json')
				.set('Authorization', `Bearer ${token}`)
				.send(testEditFunding);

			expect(response.status).toBe(400);
		});
	});
});