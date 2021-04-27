var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/casasilvina', {useNewUrlParser: true }, function (error) {
    if(error) {
        throw error;
    }else {
        console.log('Conectado a mongoDB');
    }
});

module.exports = mongoose;