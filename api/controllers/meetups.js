const mongoose = require('mongoose');
const Meetup = require('../models/meetup');
const Rsvp = require('../models/rsvp');

exports.create_meetups = (req, res, next) => {
	const meetup = new Meetup({
		_id: new mongoose.Types.ObjectId(),
		location: req.body.location,
		images: req.file.path,
		topic: req.body.topic,
		tags: req.body.tags
	});
	meetup
	.save()
	.then(result => {
		console.log(result);
		res.status(201).json({
			message: 'Meetup created successfully',
			createdMeetup: {
				location: result.location,
				topic: result.topic,
				happeningOn: result.happeningOn.toDateString(),
				tags: result.tags
			}
		});
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
}

exports.get_meetups = (req, res, next) => {
	Meetup.find()
	.select("_id location topic happeningOn tags images")
	.exec()
	.then(records => {
		res.status(200).json({
			status: records.length,
			meetups: records.map(record => {
				return {
					_id: record._id,
					location: record.location,
					images: record.images,
					topic: record.topic,
					happeningOn: record.happeningOn.toDateString(),
					tags: record.tags
				}
			})
		});
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	})
}

exports.get_a_meetup = (req, res, next) => {
	const id = req.params.meetupId;
	Meetup.findById(id)
	.select('_id location topic happeningOn tags')
	.exec()
	.then(record=> {
		if(!record){
			return res.status(404).json({
				message: "meetup not found"
			});
		}else{
			res.status(200).json({
				meetup: {
					_id: record._id,
					location: record.location,
					topic: record.topic,
					happeningOn: record.happeningOn.toDateString(),
					tags: record.tags
				}
			});
		}
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	})
}

exports.rsvps = (req, res, next) => {
	const id = req.params.meetupId;
	Meetup.findOne({_id: id})
	.then(meetup => {
		if(!meetup){
			return res.status(404).json({
				message: "Meetup not found"
			});
		}
		const rsvp = new Rsvp({
			_id: mongoose.Types.ObjectId(),
			meetupId: meetup._id,
			topic: meetup.topic,
			status: req.body.status
		});
		return rsvp.save();
	})
	.then(result => {
		console.log(result);
		res.status(201).json({
			message: "status stored",
			rsvp: {
				_id: result._id,
				meetupId: result.meetupId,
				topic: result.topic,
				status: result.status
			}
		});
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			err: err
		});
	})
}

exports.delete_meetup = (req, res, next) => {
	const id = req.params.meetupId;
	Meetup.remove({_id: id})
	.exec()
	.then(result => {
		res.status(200).json({
			message: 'Meetup deleted'
		});
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
}