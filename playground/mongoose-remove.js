const {MongoClient, ObjectID} = require ('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

//delete multiple records
// Todo.remove({}).then((result)=>{
//     console.log(result);
// });

// Todo.findOneAndRemove({_id: '59eb93dbfcd7bab66acb5dff'}).then((todo)=>{
//     console.log(todo);
// });


Todo.findByIdAndRemove('59eb93dbfcd7bab66acb5dff').then((todo) => {
    console.log(todo);
});