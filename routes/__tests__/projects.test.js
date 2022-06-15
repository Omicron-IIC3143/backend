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

  let newProjectId;
  
  const token = jwt.sign(body, secret, {subject: '2'});
	test('get projects', async () => {
		// Setup for this test specifically.
		const response = await request
			.get(`${baseUrl}`)
			.set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

		const projects = response.body;
		// Test
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
		// Setup for this test specifically.
		const response = await request
			.get(`${baseUrl}/1`)
			.set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

		const project = response.body;
		// Test
		expect(response.status).toBe(200);
    expect(project.name).toBe('Teleton');
	});
  test('post new project', async () => {
		// Setup for this test specifically.
    const newProject = {
      name: "projecto nuevo",
      description: "Esta es la descripcion del proyecto nuevo",
      pictureUrl: "url foto de projecto nuevo",
      company: "new company",
      topic: "Ayuda social",
      currentAmount: 0,
      goalAmount: 1000,
      currentState: 'pending',
      date: "2022-05-28",
      tags: "tag-1",
      userId: 1,
    };
		const response = await request
			.post(`${baseUrl}/new`)
			.set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(newProject);

    newProjectId = response.body.id;

		// Test
		expect(response.status).toBe(201);
    expect(response.res.statusMessage).toBe('New project added');
    expect(response.body.name).toBe(newProject.name);
    expect(response.body.description).toBe(newProject.description);
    expect(response.body.currentAmount).toBe(newProject.currentAmount);
    expect(response.body.goalAmount).toBe(newProject.goalAmount);
	});
  test('update project by id', async () => {
		// Setup for this test specifically.
    const updatedProject = {
      name: "projecto updated",
      description: "Esta es la descripcion del proyecto updated",
      pictureUrl: "url foto de projecto updated",
      company: "new company updated",
      topic: "Ayuda social updated",
      currentAmount: 10,
      goalAmount: 1010,
      currentState: 'pending',
      date: "2022-05-28",
      tags: "tag-1",
      userId: 1,
    };

		const response = await request
			.put(`${baseUrl}/${newProjectId}`)
			.set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(updatedProject);

		// Test
		expect(response.status).toBe(200);
    expect(response.res.statusMessage).toBe('Project updated');
    expect(response.body.name).toBe(updatedProject.name);
    expect(response.body.description).toBe(updatedProject.description);
    expect(response.body.currentAmount).toBe(updatedProject.currentAmount);
    expect(response.body.goalAmount).toBe(updatedProject.goalAmount);
	});
  test('delete project by id', async () => {
		// Setup for this test specifically.
		const response = await request
			.delete(`${baseUrl}/delete/${newProjectId}`)
			.set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

		// Test
		expect(response.status).toBe(200);
    expect(response.res.statusMessage).toBe(`Project ${newProjectId} deleted`);
	});
});