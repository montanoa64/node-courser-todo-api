//connect to db
//const MongoClient = require ('mongodb').MongoClient;
const {MongoClient, ObjectID} = require ('mongodb');//destructure


var user = {name: 'andrew', age: 28};
var {name} = user;
console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
  if(err){
    return console.log('Unable to connet to mongodb');
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').insertOne({
  //   text: 'something to do',
  //   completed: false
  // }, (err,result) => {
  //   if(err){
  //     return console.log('Unable to insert todo', err);
  //   }
  //   console.log(JSON.stringify(result.ops,undefined,2));
  // });
  // db.collection('Users').insertOne({
  //   name: 'Andrew',
  //   age: 28,
  //   location: 'Houston'
  // },(err, result) => {
  //     if(err){
  //       return console.log('Unable to insert user', err);
  //     }
  //     console.log(JSON.stringify(result.ops[0]._id.getTimestamp(),undefined,2));
  // });
  db.close();
});
