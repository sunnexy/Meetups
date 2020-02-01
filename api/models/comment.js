const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
	questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true},
	questionTitle: { type: String, ref: 'Question', required: true},
	questionbodyMessage: { type: String, ref: 'Question', required: true},
	createdBy: { type: String, ref: 'User' },
	comment: { type: String, required: true}
});

module.exports = mongoose.model('Comment', commentSchema);