const request = require("request");
const http = require("http");
const assert = require("chai").assert;

var server = require('../index.js');
const UserSchema = require('../api/v1/users/User.schema');

describe("Проверка авторизации по адресу /login", () => {

	beforeEach((done) => { //Перед каждым тестом чистим базу
      UserSchema.remove({}, (err) => done());     
  });

	it("Отправляем POST /login с параметрами: name = 'Виктор', email = 'example@mail.ru', должны получить объект с не пустыми значениями _id, name, email, а так же отправленный и полученный emailы должны быть равны", (done) => {
		let form = {
			name: 'Виктор',
			email: 'example@mail.ru'
		};

		request.post({url: 'http://localhost:5000/api/v1/users/login', form : form}, function(err, httpResponse, body) {
			let responseData = JSON.parse(body);

			assert.equal(200, httpResponse.statusCode);
			assert.isNotNull(responseData._id, '_id not null');
			assert.isNotNull(responseData.name, 'name not null');
			assert.isNotNull(responseData.email, 'email not null');
			assert.equal(form.email, responseData.email);
			done();
		});

	});

	it("Отправляем POST /login с параметрами: name='Виктор', должны получить массив errors с ошибкой 'Email not found!' с HTTP статусом 400", (done) => {
		let form = {
			name: 'Виктор'
		};

		request.post({url: 'http://localhost:5000/api/v1/users/login', form : form}, function(err, httpResponse, body) {
			let responseData = JSON.parse(body);

			assert.equal(400, httpResponse.statusCode);
			assert.deepEqual(['Email not found!'], responseData.errors);
			done();
		});
	});

});