var express = require('express');
const usersAdminController = require('../controllers/usersAdminController');
var router = express.Router();


/* GET users listing. */

router.post('/registro', usersAdminController.create);
router.post('/login', usersAdminController.validate);



module.exports = router;
