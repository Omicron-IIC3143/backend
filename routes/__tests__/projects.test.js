/* eslint-disable no-undef */
const supertest = require('supertest');
const app = require('../../app');
const bcrypt = require('bcryptjs');
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
});