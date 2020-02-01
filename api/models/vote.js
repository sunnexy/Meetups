const mongoose = require('mongoose');


const voteSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
	username: { type: String, ref: 'User' },
	upvotes: { type: Number, default: 0 },
	downvotes: { type: Number, default: 0 }
});

module.exports = mongoose.model('Vote', voteSchema);