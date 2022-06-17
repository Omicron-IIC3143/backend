/* eslint-disable no-undef */
const app = require('../../app');

describe('Project Model Test Suite', function() {
	let projectId;
	test('create project', async () => {
		// Setup for this test specifically.
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
			tags: 'testign tag',
			createdAt: new Date(),
			userId: 2,
		};
		const testProject = await app.context.db.Project.create(projectBody);
		projectId = testProject.id;
		const dbProject = await app.context.db.Project.findOne({
			where: { 
				id: projectId,
			},
		});
		expect(dbProject.name).toEqual(projectBody.name);
		expect(dbProject.description).toEqual(projectBody.description);
		expect(dbProject.pictureUrl).toEqual(projectBody.pictureUrl);
		expect(dbProject.company).toEqual(projectBody.company);
		expect(dbProject.topic).toEqual(projectBody.topic);
		expect(dbProject.currentAmount).toEqual(projectBody.currentAmount);
		expect(dbProject.goalAmount).toEqual(projectBody.goalAmount);
		expect(dbProject.currentState).toEqual(projectBody.currentState);
		expect(dbProject.date).toEqual(projectBody.date);
		expect(dbProject.tags).toEqual(projectBody.tags);
		expect(dbProject.createdAt).toEqual(projectBody.createdAt);
		expect(dbProject.userId).toEqual(projectBody.userId);
	});
	test('delete project', async () => {
		// Setup for this test specifically.
		await app.context.db.Project.destroy({ 
			where: {
				id: projectId,
			}
		});
		const deletedProject = await app.context.db.Project.findOne({
			where: { 
				id: projectId,
			},
		});
		expect(deletedProject).toBeNull();
	});
});