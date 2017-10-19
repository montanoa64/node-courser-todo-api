var mongoose = require('mongoose');
//this like model from mvc
var Todo = mongoose.model('Todo', {
    text: {
        //provide details
        type: String,
        required: true, //validator
        minlength: 1, //validator
        trim: true //trims white spaces front and back
    },
    completed: {
        //provide details
        type: Boolean,
        default: false 
    },
    completedAt: {
        //provide details
        type: Number,
        default: null
    }
});

module.exports = {
    Todo
};