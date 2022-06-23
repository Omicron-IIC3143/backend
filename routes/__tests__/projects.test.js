/* eslint-disable no-undef */
const supertest = require('supertest');
const app = require('../../app');
const jwt = require('jsonwebtoken');

const request = supertest(app.callback());

const secret = process.env.JWT_SECRET;
const baseUrl = '/projects';

describe('Projects Test Suite', function() {
	const body = {
		email: 'vicho@uc.cl',
		password: 'vicho',
	};
	const token = jwt.sign(body, secret, {subject: '2'});
	let newProjectId;

	describe('Happy Paths', function () {
		test('get projects', async () => {
			const response = await request
				.get(`${baseUrl}`)
				.set('Content-type', 'application/json')
				.set('Authorization', `Bearer ${token}`);

			const projects = response.body;
			expect(response.status).toBe(200);

			projects.map((project) => {
				if (project.id == 1) {
					expect(project.name).toBe('Teleton');
				} else if (project.id == 2) {
					expect(project.name).toBe('Colecta Social');
				}
			});
		});

		test('get project by id', async () => {
			const response = await request
				.get(`${baseUrl}/1`)
				.set('Content-type', 'application/json')
				.set('Authorization', `Bearer ${token}`);
			const project = response.body;

			expect(response.status).toBe(200);
			expect(project.name).toBe('Teleton');
		});

		test('post new project', async () => {
			const newProject = {
				name: 'projecto nuevo',
				description: 'Esta es la descripcion del proyecto nuevo',
				pictureUrl: 'url foto de projecto nuevo',
				company: 'new company',
				topic: 'Ayuda social',
				currentAmount: 0,
				goalAmount: 1000,
				currentState: 'pending',
				date: '2022-05-28',
				tags: ['tag1', 'tag2'],
				userId: 1,
			};
			const response = await request
				.post(`${baseUrl}/new`)
				.set('Content-type', 'application/json')
				.set('Authorization', `Bearer ${token}`)
				.send(newProject);

			newProjectId = response.body.id;

			expect(response.status).toBe(201);
			expect(response.res.statusMessage).toBe('New project added');
			expect(response.body.name).toBe(newProject.name);
			expect(response.body.description).toBe(newProject.description);
			expect(response.body.currentAmount).toBe(newProject.currentAmount);
			expect(response.body.goalAmount).toBe(newProject.goalAmount);
		});

		test('update project by id', async () => {
			const updatedProject = {
				name: 'projecto updated',
				description: 'Esta es la descripcion del proyecto updated',
				pictureUrl: 'url foto de projecto updated',
				company: 'new company updated',
				topic: 'Ayuda social updated',
				currentAmount: 10,
				goalAmount: 1010,
				currentState: 'pending',
				date: '2022-05-28',
				tags: ['tag1', 'tag2'],
				userId: 1,
			};

			const response = await request
				.put(`${baseUrl}/${newProjectId}`)
				.set('Content-type', 'application/json')
				.set('Authorization', `Bearer ${token}`)
				.send(updatedProject);

			expect(response.status).toBe(200);
			expect(response.res.statusMessage).toBe('Project updated');
			expect(response.body.name).toBe(updatedProject.name);
			expect(response.body.description).toBe(updatedProject.description);
			expect(response.body.currentAmount).toBe(updatedProject.currentAmount);
			expect(response.body.goalAmount).toBe(updatedProject.goalAmount);
		});

		test('delete project by id', async () => {
			const response = await request
				.delete(`${baseUrl}/delete/${newProjectId}`)
				.set('Content-type', 'application/json')
				.set('Authorization', `Bearer ${token}`);

			expect(response.status).toBe(200);
			expect(response.res.statusMessage).toBe(`Project ${newProjectId} deleted`);
		});
	});

	describe('Errors', function() {
		test('post project - no user with id x', async () => {
			const postProject = {
				name: 'projecto updated',
				description: 'Esta es la descripcion del proyecto updated',
				pictureUrl: 'url foto de projecto updated',
				company: 'new company updated',
				topic: 'Ayuda social updated',
				currentAmount: 10,
				goalAmount: 1010,
				currentState: 'pending',
				date: '2022-05-28',
				tags: 'tag-1',
				userId: 0,
			};

			const response = await request
				.post(`${baseUrl}/new`)
				.set('Content-type', 'application/json')
				.set('Authorization', `Bearer ${token}`)
				.send(postProject);

			expect(response.status).toBe(404);
		});
		test('post project - no validation', async () => {
			const postProject = {
				name: 'projecto updated',
				description: 'Esta es la descripcion del proyecto updated',
				pictureUrl: 'url foto de projecto updated',
				company: 'new company updated',
				topic: 'Ayuda social updated',
				currentAmount: 10,
				goalAmount: 1010,
				currentState: 'pending',
				date: '2022-05-28',
				tags: 'tag-1',
				userId: 1,
			};

			const response = await request
				.post(`${baseUrl}/new`)
				.set('Content-type', 'application/json')
				.send(postProject);

			expect(response.status).toBe(401);
		});
		test('delete project - previous step', async () => {
			await app.context.db.Project.destroy({ 
				where: {
					id: newProjectId,
				}
			});
		});
		test('delete project - no project with id x', async () => {
			const response = await request
				.delete(`${baseUrl}/delete/0`)
				.set('Content-type', 'application/json')
				.set('Authorization', `Bearer ${token}`);

			expect(response.status).toBe(404);
		});
		test('delete project - no validation', async () => {
			const response = await request
				.delete(`${baseUrl}/delete/0`)
				.set('Content-type', 'application/json');

			expect(response.status).toBe(401);
		});
		test('update project by id - no project', async () => {
			const updatedProject = {
				name: 'projecto updated',
				description: 'Esta es la descripcion del proyecto updated',
				pictureUrl: 'url foto de projecto updated',
				company: 'new company updated',
				topic: 'Ayuda social updated',
				currentAmount: 10,
				goalAmount: 1010,
				currentState: 'pending',
				date: '2022-05-28',
				tags: 'tag-1',
				userId: 1,
			};

			const response = await request
				.put(`${baseUrl}/${newProjectId}`)
				.set('Content-type', 'application/json')
				.set('Authorization', `Bearer ${token}`)
				.send(updatedProject);

			expect(response.status).toBe(400);
		});
		test('get project by id - no project', async () => {
			const response = await request
				.get(`${baseUrl}/${newProjectId}`)
				.set('Content-type', 'application/json')
				.set('Authorization', `Bearer ${token}`);

			expect(response.status).toBe(404);
		});
		test('get project by id - no validation', async () => {
			const response = await request
				.get(`${baseUrl}/${newProjectId}`)
				.set('Content-type', 'application/json');

			expect(response.status).toBe(404);
		});
	});
});