const usersAdminModel = require("../models/usersAdminModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    validate: async (req, res, next) => {
        try {
        console.log(req.query);
        const userAdmin = await usersAdminModel.findOne({user:req.body.user});
        if (userAdmin) {
            if(bcrypt.compareSync(req.body.password, userAdmin.password)){
                //user y pass ok, generar token
                const token = jwt.sign({userId:userAdmin._id}, req.app.get("secretKey"));
                res.json({message:"usuario ok", token:token});
            }else {
                res.json({message:"password incorrecto"});
            }
        }else {
            res.json({message: "usuario incorrecto"});
        }
        res.json(userAdmin);
        }catch(e){
            next(e);
        }
    },
    create: async function(req, res, next) {
        try{
        console.log(req.body);
        const userAdmin = new usersAdminModel({
            name: req.body.name,
            user: req.body.user,
            password: req.body.password
        })
        const document = await userAdmin.save();
        res.json(document);
    }catch(e){
        next(e);
    }
    }
}
