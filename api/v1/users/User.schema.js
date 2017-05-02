const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
	name: { type: String, required: true, trim: true },
	email: { type: String, required: true, unique: true, trim: true },
	balance: {
		type: Number,
		default: 0
	}
},
{
    timestamps: true
});

module.exports = mongoose.model('users', UserSchema);