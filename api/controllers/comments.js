const mongoose = require('mongoose');
const Question = require('../models/question');
const User = require('../models/user');
const Comment = require('../models/comment');

exports.comments_create = (req, res, next) => {
	Question.findOne({_id: req.body.questionId, title: req.body.questionTitle, bodyMessage: req.body.questionbodyMessage})
	.then(question => {
		if(question){
			const comment = new Comment({
				questionId: req.body.questionId,
				questionTitle: req.body.questionTitle,
				questionbodyMessage: req.body.questionbodyMessage,
				createdBy: req.userData.username,
				comment: req.body.comment
			});
			return comment.save()
			.then(result => {
				console.log(result);
				res.status(201).json({
					message: 'Comment successfully',
					createdComment: {
						questionId: result.questionId,
						questionTitle: result.questionTitle,
						questionBody: result.questionbodyMessage,
						createdBy: result.createdBy,
						comment: result.comment
					}
				});
			})
		}
		res.status(404).json({
			message: 'Question not found'
		})
		
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
}