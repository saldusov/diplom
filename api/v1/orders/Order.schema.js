const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dishes = require('../dishes');

let OrderSchema = new Schema({
	goodId: Number,
	status: {
		type: String,
		default: 'ordered'
	},
	prepareDate: Date,
	readyDate: Date,
	userId: Schema.ObjectId
},
{
  toObject: {
  	virtuals: true
  },
  toJSON: {
  	virtuals: true 
  },
  timestamps: true
});

OrderSchema
	.virtual('dish')
	.get(function () {
	  return dishes.get(this.goodId);
	});

module.exports = mongoose.model('orders', OrderSchema);