/* eslint-disable no-undef */
const supertest = require('supertest');
const app = require('../../app');

const request = supertest(app.callback());

describe('Index Test Suite', function() {
	test('index', async () => {
		// Setup for this test specifically.
		const response = await request
			.get('/')
			.set('Content-type', 'application/json');

		// Test
		expect(response.status).toBe(200);
	});
});