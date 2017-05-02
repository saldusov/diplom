'use strict';

class DishesList extends Array {
	get(id) {
		return this.find(dish => {
			if(dish.id == id) return true;
		});
	}
}

module.exports = DishesList;