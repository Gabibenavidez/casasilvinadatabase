const mongoose = require("../bin/mogodb");
const bcrypt = require('bcrypt');
const errorMessage = require("../util/errorMessage");

const userAdminSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, errorMessage.GENERAL.campo_obligatorio],
        trim: true
    },
    user:{
        type: String,
        unique: true,
        required: [true, errorMessage.GENERAL.campo_obligatorio],
        validate:{
            validator: async function(v){
                const document = await this.model("usersAdmin").findOne({user:v});
                console.log(document);
                if (document){
                    return false;
                }
                return true;
            },
            message:"El {VALUE} ya existe"
        }
    },
    password: {
        type: String,
        required: [true, errorMessage.GENERAL.campo_obligatorio],
    }
});
userAdminSchema.pre("save", function (next) {
    this.password = bcrypt.hashSync(this.password,10);
    next();
});
module.exports = mongoose.model("usersAdmin", userAdminSchema);
