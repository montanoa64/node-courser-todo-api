require('./config/config');
const express = require('express');
const _ = require('lodash');
const bodyParser = require('body-parser');
const {MongoClient, ObjectID} = require ('mongodb');

//server.js responsible for our routes
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {Recipe} = require('./models/recipe');
var {Pantry} = require('./models/pantry');

var app = express();

//midle ware
app.use(bodyParser.json());

app.post('/recipes',(req,res) => {
    //var body = _.pick(req.body, '')
    var recipe = new Recipe ({
        name: req.body.name,
        email: req.body.email,
        ingredients: req.body.ingredients,
        qtyOfIngredient: req.body.qtyOfIngredient
    })
    console.log(recipe);
    recipe.save().then((doc) => {
        res.send(doc);
    },(e)=>{
        res.status(400).send(e);
    });
});

app.post('/users',(req,res) => {
    var body = _.pick(req.body, ['email','password']);
    var user = new User(body);
    user.save().then((user) => {
        res.send({user});
    }).catch((e)=>res.status(400).send(e));
});

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

app.get('/pantry', (req,res) =>{
    var email = req.body.email;
    Pantry.find({email}).then((pantry)=>{
        res.send({pantry});
    },(e)=>{
        res.status(400).send(e);
    });
});

app.get('/recipe', (req,res) =>{
    Recipe.find().then((recipe)=>{
        res.send({recipe});
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