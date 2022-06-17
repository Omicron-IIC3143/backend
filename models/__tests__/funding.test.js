/* eslint-disable no-undef */
const app = require('../../app');

describe('Funding Model Test Suite', function() {
	let fundingId;
	test('create funding', async () => {
		// Setup for this test specifically.
		const fundingBody = {
			userId: 2,
			projectId: 1,
			amount: 100.0,
			createdAt: new Date(),
		};
		const testFunding = await app.context.db.Funding.create(fundingBody);
		fundingId = testFunding.id;
		const dbFunding = await app.context.db.Funding.findOne({
			 where: { 
				id: fundingId,
			  },
		});
		expect(dbFunding.userId).toEqual(fundingBody.userId);
		expect(dbFunding.projectId).toEqual(fundingBody.projectId);
		expect(dbFunding.amount).toEqual(fundingBody.amount);
		expect(dbFunding.createdAt).toEqual(fundingBody.createdAt);
	});
	test('delete funding', async () => {
		// Setup for this test specifically.
		await app.context.db.Funding.destroy({ 
			where: {
				id: fundingId,
			}
		 });
		const deletedFunding = await app.context.db.Funding.findOne({
			where: { 
				 id: fundingId,
			 },
	 	});
		expect(deletedFunding).toBeNull();
	});
});