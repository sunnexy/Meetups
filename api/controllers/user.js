const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const User = require('../models/user');
const Question = require('../models/question');
const Comment = require('../models/comment');

exports.user_create = (req, res, next) => {
	User.find({ email: req.body.email})
	.exec()
	.then(user => {
		if(user.length >= 1){
			return res.status(404).json({
				message: 'Mail already exists'
			});
		}else{
			User.find({ username: req.body.username })
			.exec()
			.then(user => {
				if(user.length >= 1){
					return res.status(409).json({
						message: 'Username already exists'
					});
				}else{
					bcrypt.hash(req.body.password, 10, (err, hash) => {
						if(err){
							return res.status(500).json({
								error: err
							});
						}else{
							const user = new User({
								_id: new mongoose.Types.ObjectId(),
								firstname: req.body.firstname,
								lastname: req.body.lastname,
								othername: req.body.othername,
								phoneNumber: req.body.phoneNumber,
								username: req.body.username,
								email: req.body.email,
								password: hash
							});
							user.save()
							.then(result => {
								console.log(result);
								res.status(201).json({
									message: 'User Created'
								});
							})
							.catch(err => {
								console.log(err);
								res.status(500).json({
									error: err
								});
							});
						}
					})
				}
			})
		}
	})
}

exports.user_login = (req, res, next) => {
	User.find({ email: req.body.email })
	.exec()
	.then(user => {
		if(user.length < 1){
			return res.status(401).json({
				message: 'Login failed'
			});
		}
		bcrypt.compare(req.body.password, user[0].password, (err, result) => {
			if(err){
				return res.status(401).json({
					message: 'Login failed'
				});
			}
			if(result){
				const token = jwt.sign({
					email: user[0].email,
					userId: user[0]._id,
					username: user[0].username
				},
				process.env.JWT_KEY,
				 {
				 	expiresIn: "1hr"
				 }
				 );
				return res.status(200).json({
					message: 'Login successful',
					token: token
				});
			}
			res.status(401).json({
				message: 'Login failed'
			});
		});
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	})
}

exports.user_data = (req, res, next) => {
	//to use 2 queries at once
	Promise.all([
			Question.find({"createdBy": username}),
			Comment.distinct("questionId", {createdBy: username})//to get posts a user commented on
		])
	.then(([record, doc]) => {
		res.status(200).json({
			username: username,
			number_of_questions_made: record.length,//number of questions created
			number_of_posts_commentedOn: doc.length//number of posts commented on
		})
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	})
}