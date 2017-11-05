var mongoose = require('mongoose');

var Recipe = mongoose.model('Recipe',{
    name: {
        type: String,
        required: true, //validator
        minlength: 1, //validator
        trim: true
    },
    email: {
        type: String,
        required: true,
        tirm: true,
        minlength: 1,
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
    Recipe
};