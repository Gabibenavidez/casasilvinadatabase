const usersWebModel = require("../models/usersWebModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    validate: async (req, res, next) => {
        try {
        console.log(req.query);
        const userWeb = await usersWebModel.findOne({email:req.body.email});
        if (userWeb) {
            if(bcrypt.compareSync(req.body.password, userWeb.password)){
                //user y pass ok, generar token
                const token = jwt.sign({userId:userWeb._id}, req.app.get("secretKey"));
                res.json({message:"usuario ok", token:token});
            }else {
                res.json({message:"password incorrecto"});
            }
        }else {
            res.json({message: "usuario incorrecto"});
        }
        res.json(userWeb);
        }catch(e){
            next(e);
        }
    },
    create: async function(req, res, next) {
        try{
        console.log(req.body);
        const userWeb = new usersWebModel({
            email: req.body.email,
            password: req.body.password
        })
        const document = await userWeb.save();
        res.json(document);
    }catch(e){
        next(e);
    }
    }
}
