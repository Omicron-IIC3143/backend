/* eslint-disable no-undef */
const app = require('../../app');
const bcrypt = require('bcryptjs');

function hashPassword(password) {
	const salt = bcrypt.genSaltSync();
	const hash = bcrypt.hashSync(password, salt);
	return hash;
}

describe('User Model Test Suite', function() {
	let userId;
	test('create user', async () => {
		// Setup for this test specifically.
		const userBody = {
			name: 'user name testing',
			rut: 'user rut testing',
			email:'usertest@test.cl',
			password: hashPassword('test'),
			isAdmin: true,
			money: 0,
			pictureUrl: 'test picture url',
			description: ' test description',
			createdAt: new Date(),
		};
		const testUser = await app.context.db.User.create(userBody);
		userId = testUser.id;
		const dbUser = await app.context.db.User.findOne({
			 where: { 
				id: userId,
			  },
		});
		expect(dbUser.name).toEqual(userBody.name);
		expect(dbUser.rut).toEqual(userBody.rut);
		expect(dbUser.email).toEqual(userBody.email);
		expect(dbUser.password).toEqual(userBody.password);
		expect(dbUser.isAdmin).toEqual(userBody.isAdmin);
		expect(dbUser.money).toEqual(userBody.money);
		expect(dbUser.pictureUrl).toEqual(userBody.pictureUrl);
		expect(dbUser.description).toEqual(userBody.description);
		expect(dbUser.createdAt).toEqual(userBody.createdAt);
	});
	test('delete user', async () => {
		// Setup for this test specifically.
		await app.context.db.User.destroy({ 
			where: {
				id: userId,
			}
		 });
		const deletedUser = await app.context.db.User.findOne({
			where: { 
				 id: userId,
			 },
	 	});
		expect(deletedUser).toBeNull();
	});
});