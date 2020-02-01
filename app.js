const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const meetupRoutes = require('./api/routes/meetups');
const questionRoutes = require('./api/routes/questions');
const userRoutes = require('./api/routes/user');
const voteRoutes = require('./api/routes/votes');
const commentRoutes = require('./api/routes/comments');


mongoose.connect('mongodb://localhost:27017/close', 
	{
		useNewUrlParser: true
	}
);
mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	if(req.method === "OPTIONS"){
		res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
		return res.status(200).json({});
	}
	next();
});

app.use('/meetups', meetupRoutes);
app.use('/questions', questionRoutes);
app.use('/user', userRoutes);
app.use('/votes', voteRoutes);
app.use('/comments', commentRoutes);


app.use((req, res, next) => {
	const error = new Error('Page Not found');
	error.status = 404;
	next(error);
})

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});

module.exports = app;
