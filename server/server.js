var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/TodoApp');

//this like model from mvc
var Todo = mongoose.model('Todo', {
    text: {
        //provide details
        type: String
    },
    completed: {
        //provide details
        type: Boolean
    },
    completedAt: {
        //provide details
        type: Number
    }
});

var otherTodo = new Todo({
});

otherTodo.save().then((doc) => {
    console.log('Saved todo', doc);
},(e) => {
    console.log('unable to save todo');
});

// var newTodo = new Todo({
//     text: 'Cook dinner'
// });

// //save to the database

// //save returns a promise
// newTodo.save().then((doc) => {
//     console.log('Saved todo', doc)
// }, (e) => {
//     console.log('Unable to save todo');
// });