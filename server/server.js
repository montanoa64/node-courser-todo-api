require('./config/config');
const express = require('express');
const _ = require('lodash');
const bodyParser = require('body-parser');
const {MongoClient, ObjectID} = require ('mongodb');

//server.js responsible for our routes
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

//midle ware
app.use(bodyParser.json());

//save the todos
app.post('/todos', (req, res) => {
    //request the stuff that got posted to the body 
    var todo = new Todo({
        text: req.body.text,
     //   completed: req.body.completed
    });
    //save it to db
    todo.save().then((doc) => {
        res.send(doc); //what the user sees
    },(e) =>{
        res.status(400).send(e); //what user sees if not save to db
    });
});

//get all the todos to show to the user
app.get('/todos', (req, res) => {
    Todo.find().then((todos)=>{
        res.send({todos});
    },(e)=>{
        res.status(400).send(e);
    });
});

app.get('/todos/:id', (req,res) =>{
    //have key value pairs
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        //if id is not valid send a 404 error with an empty body
        return res.status(404).send(); 
    }
    Todo.findById(id).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e)=>res.status(400).send());
    
});

app.delete('/todos/:id', (req,res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        //if id is not valid send a 404 error with an empty body
        return res.status(404).send(); 
    }
    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
        
    }).catch((e)=>res.status(400).send());
    
});

app.patch('/todos/:id', (req, res) =>{
    var id = req.params.id;
    var body = _.pick(req.body, ['text','completed']);
    if(!ObjectID.isValid(id)){
        //if id is not valid send a 404 error with an empty body
        return res.status(404).send(); 
    }

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;
    }
    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});

    }).catch((e)=>res.status(400));

});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`'Started at port ${port}`);
});

module.exports = {
    app
};

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