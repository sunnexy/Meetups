const mongoose = require('mongoose');
const Question = require('../models/question');
const User = require('../models/user');
const Vote = require('../models/vote');

exports.votes_upvote = (req, res, next) => {
	const id = req.params.questionId;
	Question.findById(id)
	.exec()
	.then(question => {
		if(!question){
			return res.status(404).json({
				message: "Question not found"
			});
		}
	})
	Vote.findOne({ questionId: id, upvotes: 1, username: username })
	.exec()
	.then(questionId => {
		if(questionId){
			return res.status(404).json({
				message: 'Upvote already'
			});
		}
		const updateOps = {};
		Vote.updateOne({ questionId: id, username: username, upvotes: 0, downvotes: 1}, { $set: {questionId: id, username: username, upvotes:1, downvotes: 0}}, {upsert:true})
		.select('questionId upvote downvote')
		.exec()
		.then(result => {
			console.log(result);
			res.status(200).json({
				message: 'Upvoted successfully',
				id: 0,
				questionId: result.questionId,
				upvotes: result.upvotes,
				downvotes: result.downvotes
			})
		})
	})
}

exports.votes_downvote = (req, res, next) => {
	const id = req.params.questionId;
	Question.findById(id)
	.exec()
	.then(question => {
		if(!question){
			return res.status(404).json({
				message: "Question not found"
			});
		}
	})
	Vote.findOne({ questionId: id, downvotes: 1, username: username })
	.exec()
	.then(questionId => {
		if(questionId){
			return res.status(404).json({
				message: 'Downvote already'
			});
		}
		const updateOps = {};
		Vote.updateOne({ questionId: id, username: username, upvotes: 1, downvotes: 0}, { $set: {questionId: id, username: username, upvotes:0, downvotes: 1}}, {upsert:true})
		.select('questionId upvote downvote')
		.exec()
		.then(result => {
			console.log(result);
			res.status(200).json({
				message: 'Downvoted successfully',
				id: 0,
				questionId: result.questionId,
				upvotes: result.upvotes,
				downvotes: result.downvotes
			})
		})
	})
}

exports.get_votes = (req, res, next) => {
	Vote.aggregate([{$group: {_id: "$questionId",
		  upvotes: {$sum: "$upvotes"}, downvotes: {$sum: "$downvotes"}, numberOfVotes: {$sum: 1}
	}}])
	//.select("questionId upvotes downvotes username")
	.exec()
	.then(docs => {
		res.status(200).json({
			count: docs.length,
			votes: docs.map(doc => {
				return{
					questionId: doc._id,
					//username: doc.username,
					upvote: doc.upvotes,
					downvotes: doc.downvotes,
					numberOfVotes: doc.numberOfVotes
				}
			})
		})
	})
}