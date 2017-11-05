var mongoose = require('mongoose');

var Pantry = mongoose.model('Pantry', {
    email: {
        type: String,
        required: true,
        tirm: true,
        minlength: 1,
        unique: true,
    },
    ingredients: {
        type: [String],
        required: true
    },
    qtyOfIngredient: {
        type: [Number],
        required:true
    }
});

module.exports = {
    Pantry
};