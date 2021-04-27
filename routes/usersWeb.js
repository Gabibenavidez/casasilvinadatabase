var express = require('express');
const usersWebController = require('../controllers/usersWebController');
var router = express.Router();


/* GET users listing. */

router.post('/registro', usersWebController.create);
router.post('/login', usersWebController.validate);



module.exports = router;
