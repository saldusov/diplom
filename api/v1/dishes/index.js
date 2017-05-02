const menu = require('../../../src/dist/menu.json');
const DishesList = require('./DishesList.class');

function createDishesList() {
	var dishes = new DishesList();
	menu.forEach(dish => dishes.push(dish));
	return dishes;
}

module.exports = createDishesList();

