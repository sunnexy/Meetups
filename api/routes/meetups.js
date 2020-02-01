const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');


const storage = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null, './uploads/');
	},
	filename: function(req, file, cb){
		cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
	}
});

const fileFilter = (req, file, cb) => {
	//reject a file
	if(file.mimetype === 'image/jpeg' || file.mimetype === "image/png"){
		cb(null, true);
	}else{
		cb(null, false);
	}	
};

const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 5
	},
	 fileFilter: fileFilter
});


const MeetupsController = require('../controllers/meetups');

router.post("/", upload.single('images'), checkAuth, MeetupsController.create_meetups);

router.get('/', checkAuth, MeetupsController.get_meetups);

router.get("/:meetupId", checkAuth, MeetupsController.get_a_meetup);

router.post("/:meetupId/rsvps", checkAuth, MeetupsController.rsvps);

router.delete('/:meetupId', checkAuth, MeetupsController.delete_meetup);

module.exports = router;