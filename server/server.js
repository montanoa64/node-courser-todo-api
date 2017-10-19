var express = require('express');
var bodyParser = require('body-parser');

//server.js responsible for our routes
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

//midle ware
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    //request the stuff that got posted to the body 
    var todo = new Todo({
        text: req.body.text,
        completed: req.body.completed
    });
    //save it to db
    todo.save().then((doc) => {
        res.send(doc); //what the user sees
    },(e) =>{
        res.status(400).send(e); //what user sees if not save to db
    });
});

var port = 3000;
app.listen(port, () => {
    console.log('Started on port ', port);
});



// var user = new User({
//     email: 'andsye@gjakd.com     '
// });

// user.save().then((doc) => {
//     console.log('Saved User', doc);
// },(e) => {
//     console.log('Unable to save User', e);
// });

// var otherTodo = new Todo({
//     text: '    Edit this video'
// });

// otherTodo.save().then((doc) => {
//     console.log('Saved todo', doc);
// },(e) => {
//     console.log('unable to save todo', e);
// });

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