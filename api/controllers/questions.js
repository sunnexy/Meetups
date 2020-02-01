const mongoose = require('mongoose');
const Question = require('../models/question');
const Meetup = require('../models/meetup');
const User = require('../models/user');
const Vote = require('../models/vote');



exports.questions_create = (req, res, next) => {
	Meetup.findById(req.body.meetupId)
	.then(meetup => {
	if(!meetup){
		return res.status(404).json({
			message: 'Meetup not found'
		});
	}
	const question = new Question({
		_id: mongoose.Types.ObjectId(),
		createdBy: req.userData.username,
		meetup: req.body.meetupId,
		title: req.body.title,
		bodyMessage: req.body.bodyMessage,
		//votes: req.body.votes
	});
	return question
	.save()
	})
	.then(question => {
		console.log(question); 
		res.status(201).json({
			message: 'Asked successfully',
			question: {
				_id: question._id,
				user: username,
				meetup: question.meetup,
				title: question.title,
				body: question.bodyMessage,
				upvotes: question.upvotes,
				downvotes: question.downvotes,
				Upvoters_id: question.Upvoters_id,
				Downvoters_id: question.Downvoters_id
			}
		})
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});		
}

exports.questions_get = (req, res, next) => {
	const id = req.params.questionId;
	Question.findOne({_id: id })
	.select('_id meetup title bodyMessage createdBy upvotes downvotes Upvoters_id Downvoters_id')
	.exec()
	.then(records => {
		// records.forEach(async function(record) {
		// 	record.votes = await getVotes(record._id)
		// })
		res.status(200).json({
			questions: {
				id: records._id,
				meetup: records.meetup,
				title: records.title,
				createdBy: records.createdBy,
				upvotes: records.upvotes,
				Upvoters_id: records.Upvoters_id,
				downvotes: records.downvotes,
				Downvoters_id: records.Downvoters_id
			}
		});
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	})
}
exports.votes_upvote = (req, res, next) => {
	const id = req.params.questionId;
	Promise.all([
		Question.findOne({ _id: id, Upvoters_id: userId }),
		Question.findOne({ _id: id, Downvoters_id: userId })
	])
	.then(([doc, item]) => {
		if(doc){
			return res.status(404).json({
				message: "Upvoted already"
			});
		}else if(item){
			Promise.all([
				Question.updateOne({ _id: id}, { $inc: {upvotes: 1, downvotes: -1}}),
				Question.updateOne({ _id: id}, { $pull: {"Downvoters_id": userId}, $push: {"Upvoters_id": userId}})
			])
			.then(([records, docs]) => {
				res.status(200).json({
					message: "Upvoted successfully",
					ID: 1
				})
			})
		}else if(!doc && !item){
			Promise.all([
				Question.updateOne({ _id: id}, { $inc: {upvotes: 1}}),
				Question.updateOne({ _id: id}, { $push: {"Upvoters_id": userId}})
			])
			.then(([record, doc]) => {
				res.status(200).json({
					message: 'Upvoted successfully',
			 		id: 0,
				})
			})
		}
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	})
}

exports.votes_downvote = (req, res, next) => {
	const id = req.params.questionId;
	Promise.all([
		Question.findOne({ _id: id, Downvoters_id: userId }),
		Question.findOne({ _id: id, Upvoters_id: userId })
	])
	.then(([question, downvote]) => {
		if(question){
			return res.status(404).json({
				message: "Downvoted already"
			});
		}else if(downvote){
			Promise.all([
				Question.updateOne({ _id: id}, { $inc: {downvotes: 1, upvotes: -1}}),
				Question.updateOne({ _id: id}, { $pull: {"Upvoters_id": userId}, $push: {"Downvoters_id": userId}})
			])
			.then(([record, doc]) => {
				res.status(200).json({
					message: "Downvoted successfully",
					ID: 1
				})
			})
		}else if(!question && !downvote){
			Promise.all([
				Question.updateOne({ _id: id}, { $inc: {downvotes: 1}}),
				Question.updateOne({ _id: id}, { $push: {"Upvoters_id": userId}})
			])
			.then(([record, doc]) => {
				res.status(200).json({
					message: 'Downvoted successfully',
			 		id: 0,
				})
			})
		}	
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	})
}