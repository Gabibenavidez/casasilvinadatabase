const mongoose = require("../bin/mogodb");

const categorySchema = new mongoose.Schema({
    name: String
});

/*categorySchema.statics.findByIdAndValidate = async function(id) {
    const document = await this.findById(id);
    if (!document){
        return{
            error: true,
            message: "No existe esa categoria"
        }
    }
    return document;
}*/

module.exports = mongoose.model("categories", categorySchema);