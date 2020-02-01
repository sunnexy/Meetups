const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	firstname : { type: String, required: true },
	lastname : { type: String, required: true },
	othername : { type: String, required: true },
	email : {
	 type: String,
	 required: true,
	 unique: true,
	 match:  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
	},
	password: { type: String, required: true },
	phoneNumber : { type: String, required: true },
	username : { type: String, required: true, unique: true },
	registered : { type: Date, default: Date.now },
	isAdmin : Boolean ,
});

module.exports = mongoose.model('User', userSchema);
