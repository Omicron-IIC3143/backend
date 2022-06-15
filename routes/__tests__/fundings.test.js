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

	test('get seed fundings', async () => {
		// Setup for this test specifically.
		const response = await request
			.get(`${baseUrl}`)
			.set('Content-type', 'application/json')
			.set('Authorization', `Bearer ${token}`);

		const seedFundings = response.body;

		// Test
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
		// Setup for this test specifically.
		const response = await request
			.get(`${baseUrl}/1`)
			.set('Content-type', 'application/json')
			.set('Authorization', `Bearer ${token}`);

		// Test
		expect(response.status).toBe(200);
		expect(response.body.userId).toBe(3);
		expect(response.body.projectId).toBe(1);
		expect(response.body.amount).toBe(100.0);
	});
	test('post a new funding', async () => {
		// Setup for this test specifically.
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

		// Test
		expect(response.status).toBe(201);
		testFundingId = response.body.id;
	});
	
	test('edit funding', async () => {
		// Setup for this test specifically.
		const testEditFunding = {
			amount: 150.0
		};

		const response = await request
			.put(`${baseUrl}/${testFundingId}`)
			.set('Content-type', 'application/json')
			.set('Authorization', `Bearer ${token}`)
			.send(testEditFunding);

		// Test
		expect(response.status).toBe(200);
	});
	test('delete funding', async () => {
		// // Setup for this test specifically.
		const response = await request
			.delete(`${baseUrl}/delete/${testFundingId}`)
			.set('Content-type', 'application/json')
			.set('Authorization', `Bearer ${token}`);

		// Test
		expect(response.status).toBe(200);
	});
});