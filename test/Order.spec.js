const request = require("request");
const http = require("http");
const assert = require("chai").assert;

var server = require('../index.js');
const OrderSchema = require('../api/v1/orders/Order.schema');
const UserSchema = require('../api/v1/users/User.schema');
const DishesList = require('../api/v1/dishes');

describe("Проверка модуля работы с заказами /api/v1/orders", () => {

	beforeEach((done) => { //Перед каждым тестом чистим базу
      OrderSchema.remove({}, (err) => { 
		UserSchema.remove({}, (err) => { 
			done();         
		});          
      });   
  	});

	it("Отправляем GET /, должны получить пустой массив", (done) => {
		let form = {
			name: 'Виктор',
			email: 'example@mail.ru'
		};

		request.get('http://localhost:5000/api/v1/orders', function(err, httpResponse, body) {
			let responseData = JSON.parse(body);

			assert.equal(200, httpResponse.statusCode);
			assert.isArray(responseData);
			assert.equal(responseData.length, 0);
			done();
		});

	});

	it('Отправляем POST с неполными данными, указываем только userId, должны получить ошибку errors: ["Good not found!"] со статусом 400', (done) => {
        let order = {
            userId: "111",
            //goodId: ""
        };

        request.post({url: 'http://localhost:5000/api/v1/orders', form: order}, function(err, httpResponse, body) {
			let responseData = JSON.parse(body);

			assert.equal(400, httpResponse.statusCode);
			assert.isArray(responseData.errors);
			assert.deepEqual(responseData.errors, ["Good not found!"]);
			done();
		});
  	});

  	it('Отправляем POST с верными данными, должны получить объект с полями _id, goodId, userId, status, dish, createdAt, updatedAt. Также поле status должно быть равно "ordered"', function(done) {

  		createUser()
  			.then((user) =>  {
  				let order = {
  					userId: user.id,
  					goodId: DishesList[0].id
  				};

  				request.post({url: 'http://localhost:5000/api/v1/orders', form: order}, function(err, httpResponse, body) {
					let responseData = JSON.parse(body);

					assert.equal(200, httpResponse.statusCode);
					assert.isNotNull(responseData._id);
					assert.isNotNull(responseData.goodId);
					assert.isNotNull(responseData.userId);
					assert.isNotNull(responseData.status);
					assert.isNotNull(responseData.dish);
					assert.isNotNull(responseData.createdAt);
					assert.isNotNull(responseData.updatedAt);
					assert.equal(responseData.status, 'ordered');
					done();
				});        
		});
  	});

  	it('Отправляем GET /:id, должны получить объект с полями _id, goodId, userId, status, dish, createdAt, updatedAt. Так же :id в запросе должен совпадать с полученным _id', function(done) {

  		createUser()
  			.then((user) => createOrder(user.id, DishesList[0].id))
  			.then((order) => {
  				request.get('http://localhost:5000/api/v1/orders/' + order.id, function(err, httpResponse, body) {
					let responseData = JSON.parse(body);

					assert.equal(200, httpResponse.statusCode);
					assert.isNotNull(responseData._id);
					assert.isNotNull(responseData.goodId);
					assert.isNotNull(responseData.userId);
					assert.isNotNull(responseData.status);
					assert.isNotNull(responseData.dish);
					assert.isNotNull(responseData.createdAt);
					assert.isNotNull(responseData.updatedAt);
					assert.equal(responseData._id, order.id);
					done();
				});
  			});
  	});

  	it('Отправляем POST /:id/:status, :status будет равен "prepare". Cоздадим order с status = "ordered", после запросы должны получить объект order с тем же _id и новым статусом "prepare".', function(done) {

  		createUser()
  			.then((user) => createOrder(user.id, DishesList[0].id, 'ordered'))
  			.then((order) => {
  				request.post('http://localhost:5000/api/v1/orders/' + order.id + '/prepare', function(err, httpResponse, body) {
					let responseData = JSON.parse(body);

					assert.equal(200, httpResponse.statusCode);
					assert.isNotNull(responseData.order);
					assert.equal(responseData.order._id, order.id);
					assert.equal(responseData.order.status, 'prepare');
					done();
				});
			});
  	});

});

function createUser() {
	return new Promise((resolve, reject) => {
		let user = new UserSchema({name: 'Виктор', email: 'saldusov@gmail.com'});
		user.save((err, saved) => resolve(saved));
	});
	
}

function createOrder(user, dish, status = 'ordered') {
	return new Promise((resolve, reject) => {
		let order = new OrderSchema({userId: user, goodId: dish});
		order.save((err, saved) => resolve(saved));
	});
}