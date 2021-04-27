var express = require('express');
const productosController = require('../controllers/productosController');
var router = express.Router();

/* GET users listing. */
router.get('/', productosController.getAll);
router.get('/:id', productosController.getById); 
router.post('/', productosController.create);
router.put('/:id', productosController.update);
router.delete('/:id', productosController.delete);


module.exports = router;
