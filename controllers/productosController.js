const categoriesModel = require("../models/categoriesModel");
const productosModel = require("../models/productosModel");

module.exports = {
    getAll: async (req, res, next) => {
        try {
        console.log(req.query);
        const productos = await productosModel.find({}).populate("category");
      res.status(200).json(productos);
        }catch(e){
            next(e);
        }
    },
    getById: async function(req, res, next) {
        try{
        console.log(req.params.id);
        const producto = await productosModel.findById(req.params.id);
        res.status(200).json(producto);
        }catch(e){
            next(e);
        }
    },
    create:  async function(req, res, next) {
        console.log(req.body);
        try {
            const producto = new productosModel({
                name: req.body.name,
                sku: req.body.sku,
                description: req.body.description,
                price: req.body.price,
                quantity: req.body.quantity,
                category: categoria._id,
                tags: req.body.tags
            });
            const document = await producto.save();
            res.status(201).json(document);
        }catch(e) {
            console.log(e);
            next(e);
        }
    },
    update: async function(req, res, next) {
        try {
        console.log(req.params.id, req.body);
        const producto = await productosModel.update({ _id: req.params.id }, req.body, {multi: false});
        res.status(200).json(producto);
        }catch(e){
            next(e);
        }
    },
    delete: async function(req, res, next) {
        try{
        console.log(req.params.id);
        const data = await productosModel.deleteOne({ _id: req.params.id }); 
        res.status(200).json(data);
        }catch(e){
            next(e);
        }
    } 

}

    