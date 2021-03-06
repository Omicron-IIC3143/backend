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

	describe('Happy Paths', function () {
		test('get seed reports', async () => {
			const response = await request
				.get(`${baseUrl}`)
				.set('Content-type', 'application/json')
				.set('Authorization', `Bearer ${token}`);

			const seedReports = response.body;

			expect(response.status).toBe(200);
			seedReports.map((seedReport) => {
				if (seedReport.id == 1) {
					expect(seedReport.title).toBe('Teleton esta con un buen progreso.');
				} else if (seedReport.id == 2) {
					expect(seedReport.title).toBe('Colecta avanza de forma lenta.');
				}
			});
		});

		test('get report by id', async () => {
			const response = await request
				.get(`${baseUrl}/1`)
				.set('Content-type', 'application/json')
				.set('Authorization', `Bearer ${token}`);

			expect(response.status).toBe(200);
			expect(response.body.title).toBe('Teleton esta con un buen progreso.');
			expect(response.body.description).toBe('Mediante las donaciones obtenidas se han recaudado $19.000.001 en las primeras horas.');
			expect(response.body.pictureUrl).toBe('https://img.asmedia.epimg.net/resizer/YUrWEd-2UTLSrdIQouzNcsukEtc=/1952x1098/cloudfront-eu-central-1'
			+ '.images.arcpublishing.com/diarioas/QFXQBLFUANO7LKRURTE7ZXNL6E.jpg');
			expect(response.body.projectId).toBe(1);
		});

		test('post a new report', async () => {
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

			expect(response.status).toBe(201);
			testReportId = response.body.id;
		});

		test('edit report', async () => {
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

			expect(response.status).toBe(200);
		});

		test('delete report', async () => {
			const response = await request
				.delete(`${baseUrl}/delete/${testReportId}`)
				.set('Content-type', 'application/json')
				.set('Authorization', `Bearer ${token}`);

			expect(response.status).toBe(200);
		});
	});

	describe('Errors', function() {
		test('delete report - no report', async () => {
			const response = await request
				.delete(`${baseUrl}/delete/${testReportId}`)
				.set('Content-type', 'application/json')
				.set('Authorization', `Bearer ${token}`);

			expect(response.status).toBe(404);
		});

		test('edit report - no report', async () => {
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

			expect(response.status).toBe(400);
		});
		test('edit report - no project with id x', async () => {
			const testEditFunding = {
				title: 'test report update',
				description: 'description of test report update',
				projectId: 0,
				pictureUrl: 'update test report pictureUrl'
			};

			const response = await request
				.put(`${baseUrl}/${testReportId}`)
				.set('Content-type', 'application/json')
				.set('Authorization', `Bearer ${token}`)
				.send(testEditFunding);

			expect(response.status).toBe(400);
		});
		test('post report - no project with id x', async () => {
			const testPostFunding = {
				title: 'test report update',
				description: 'description of test report update',
				projectId: 0,
				pictureUrl: 'update test report pictureUrl'
			};

			const response = await request
				.post(`${baseUrl}/new`)
				.set('Content-type', 'application/json')
				.set('Authorization', `Bearer ${token}`)
				.send(testPostFunding);

			expect(response.status).toBe(404);
		});
		test('post report - no project with id x', async () => {
			const testPostFunding = {
				title: 'test report update',
				description: 'description of test report update',
				projectId: 0,
				pictureUrl: 'update test report pictureUrl'
			};

			const response = await request
				.post(`${baseUrl}/new`)
				.set('Content-type', 'application/json')
				.send(testPostFunding);

			expect(response.status).toBe(401);
		});

		test('get report by id - no report', async () => {
			const response = await request
				.get(`${baseUrl}/${testReportId}`)
				.set('Content-type', 'application/json')
				.set('Authorization', `Bearer ${token}`);

			expect(response.status).toBe(404);
		});
		test('get report by id - no validation', async () => {
			const response = await request
				.get(`${baseUrl}/${testReportId}`)
				.set('Content-type', 'application/json');

			expect(response.status).toBe(401);
		});
		test('get all reports - no validation', async () => {
			const response = await request
				.get(`${baseUrl}`)
				.set('Content-type', 'application/json');

			expect(response.status).toBe(401);
		});
	});

	
});