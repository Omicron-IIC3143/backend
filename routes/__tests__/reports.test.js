/* eslint-disable no-undef */
const supertest = require('supertest');
const app = require('../../app');
const jwt = require('jsonwebtoken');

const request = supertest(app.callback());
const secret = process.env.JWT_SECRET;
const baseUrl = '/reports';

describe('Report Test Suite', function() {
	const body = {
		email: 'vicho@uc.cl',
		password: 'vicho'
	};

	const token = jwt.sign(body, secret, {subject: '2'});

	let testReportId;

	test('get seed reports', async () => {
		// Setup for this test specifically.
		const response = await request
			.get(`${baseUrl}`)
			.set('Content-type', 'application/json')
			.set('Authorization', `Bearer ${token}`);

		const seedReports = response.body;

		// Test
		expect(response.status).toBe(200);
		seedReports.map((seedReport) => {
			if (seedReport.id == 1) {
				expect(seedReport.title).toBe('teleton esta de pana');
			} else if (seedReport.id == 2) {
				expect(seedReport.title).toBe('colecta esta de pana');
			}
		});
	});
	test('get report by id', async () => {
		// Setup for this test specifically.
		const response = await request
			.get(`${baseUrl}/1`)
			.set('Content-type', 'application/json')
			.set('Authorization', `Bearer ${token}`);

		// Test
		expect(response.status).toBe(200);
		expect(response.body.title).toBe('teleton esta de pana');
		expect(response.body.description).toBe('Esta es la descripcion del reporte Teleton');
		expect(response.body.pictureUrl).toBe('foto del reporte teleton');
		expect(response.body.projectId).toBe(1);
	});
	test('post a new report', async () => {
		// Setup for this test specifically.
		const testReport = {
			title: 'test report',
			description: 'description of test report',
			pictureUrl: 'pictureUrl of test report',
			projectId: 1
		};
		const response = await request
			.post(`${baseUrl}/new`)
			.set('Content-type', 'application/json')
			.set('Authorization', `Bearer ${token}`)
			.send(testReport);

		// Test
		expect(response.status).toBe(201);
		testReportId = response.body.id;
	});
	
	test('edit report', async () => {
		// Setup for this test specifically.
		const testEditFunding = {
			title: 'test report update',
			description: 'description of test report update',
			projectId: 1,
			pictureUrl: 'update test report pictureUrl'
		};

		const response = await request
			.put(`${baseUrl}/${testReportId}`)
			.set('Content-type', 'application/json')
			.set('Authorization', `Bearer ${token}`)
			.send(testEditFunding);

		// Test
		expect(response.status).toBe(200);
	});
	test('delete report', async () => {
		// // Setup for this test specifically.
		const response = await request
			.delete(`${baseUrl}/delete/${testReportId}`)
			.set('Content-type', 'application/json')
			.set('Authorization', `Bearer ${token}`);

		// Test
		expect(response.status).toBe(200);
	});
});