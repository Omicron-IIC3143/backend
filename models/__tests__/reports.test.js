/* eslint-disable no-undef */
const app = require('../../app');

describe('Report Model Test Suite', function() {
	let reportId;
	test('create report', async () => {
		// Setup for this test specifically.
		const reportBody = {
			title: 'testing report',
			description: 'testing report description',
			pictureUrl: 'testing picture url',
			projectId: 1,
			createdAt: new Date(),
		};
		const testReport = await app.context.db.Reports.create(reportBody);
		reportId = testReport.id;
		const dbReport = await app.context.db.Reports.findOne({
<<<<<<< HEAD
			where: { 
				id: reportId,
			},
=======
			 where: { 
				id: reportId,
			  },
>>>>>>> 3fce6038d4135d16f45e5a6062a5f610c15a40aa
		});
		expect(dbReport.title).toEqual(reportBody.title);
		expect(dbReport.description).toEqual(reportBody.description);
		expect(dbReport.pictureUrl).toEqual(reportBody.pictureUrl);
		expect(dbReport.projectId).toEqual(reportBody.projectId);
		expect(dbReport.createdAt).toEqual(reportBody.createdAt);
	});
	test('delete report', async () => {
		// Setup for this test specifically.
		await app.context.db.Reports.destroy({ 
			where: {
				id: reportId,
			}
		});
		const deletedReport = await app.context.db.Reports.findOne({
			where: { 
				id: reportId,
			},
		});
		expect(deletedReport).toBeNull();
	});
});