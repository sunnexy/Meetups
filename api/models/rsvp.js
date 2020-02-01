const mongoose = require('mongoose');

const rsvpSchema = mongoose.Schema({
	rsvpId: { type: mongoose.Schema.Types.ObjectId},
	meetupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Meetup' },
	topic: { type: String, ref: 'Meetup'},
	status: { type: String, required: true}
});

module.exports = mongoose.model('Rsvp', rsvpSchema);