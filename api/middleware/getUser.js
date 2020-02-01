const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	if(req.headers && req.headers.authorization){
		const authorization = req.headers.authorization.split(' ')[1];
		try{
			decoded = jwt.verify(authorization, process.env.JWT_KEY);
			username = decoded.username;
			userId = decoded.userId;
			next();	
		}catch(error){
			return res.status(401).json({
				message: 'Auth No'
			});
		}
	}
		// const user = req.userData.username;
		//  User.findOne({_id: user})
		// .then(user => {
		// 	console.log(user);
		// })
		

	// try{
	// 	const authorization = req.headers.authorization.split(" ")[1];
	// 	console.log(authorization);
	// 	const decoded = jwt.verify(authorization, process.env.JWT_KEY);
	// 	username = decoded.username;
	// 	next();
	// }catch(error){
	// 	return res.status(401).json({
	// 		message: 'Auth failed'
	// 	});
	// }
}
