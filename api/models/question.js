const mongoose = require('mongoose');


const questionSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	createdOn: { type: Date, default: Date.Now },
	createdBy: { type: String, ref: 'User' }, // represents the user asking the question
	meetup: { type: mongoose.Schema.Types.ObjectId, ref: 'Meetup', required: true }, // represents the meetup the question is for
	title: { type: String },
	bodyMessage: { type: String },
	upvotes: {type: Number, default:  0},
	downvotes: {type: Number, default:  0},
	Upvoters_id: [String],//to store upvoters id
	Downvoters_id: [String]//to store downvoters id
});

module.exports = mongoose.model('Question', questionSchema);