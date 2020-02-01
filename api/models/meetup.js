const mongoose = require('mongoose');

const meetupSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	createdOn : { type: Date, default: Date.now },
	location : { type: String, required: true },
	images : { type: String, required: true }, // OPTIONAL: URL to the image location
	topic : { type: String, required: true }, 
	happeningOn :  { type: Date, default: Date.now }, // when the meetup is holding
	tags : { type: String, required: true }
});

module.exports = mongoose.model('Meetup', meetupSchema);