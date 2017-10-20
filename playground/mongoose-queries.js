const {MongoClient, ObjectID} = require ('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var idUser = '59e6cf0e26a05dcc3f85fed9';

User.findById(idUser).then((user)=> {
    if(!user){
        return console.log('unable to find user');
    }
    console.log(JSON.stringify(user,undefined,2));
}).catch((e)=>console.log(e));


// var id = '6s9ea65e471beefe41b0d649e';

// if(!ObjectID.isValid(id)){
//     console.log('Id not valid');
// }

//finds the rows with the id above and prints it to the console
// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// //finds the first row with the same id
// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo);
// });

//finds row by id only
// Todo.findById(id).then((todo) => {
//     if(!todo){
//         return console.log('Id not found');
//     }
//     console.log('Todo by Id', todo);
// }).catch((e)=>console.log(e));