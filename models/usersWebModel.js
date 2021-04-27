const mongoose = require("../bin/mogodb");
const bcrypt = require('bcrypt');
const errorMessage = require("../util/errorMessage");

const userWebSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true, errorMessage.GENERAL.campo_obligatorio],
        trim: true
    },
    password: {
        type: String,
        required: [true, errorMessage.GENERAL.campo_obligatorio]
    }
});
userWebSchema.pre("save", function (next) {
    this.password = bcrypt.hashSync(this.password,10);
    next();
});
module.exports = mongoose.model("usersWebAdmin", userWebSchema);
