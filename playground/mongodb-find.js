//connect to db
//const MongoClient = require ('mongodb').MongoClient;
const {MongoClient, ObjectID} = require ('mongodb');//destructure

// connect to the db 
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
  if(err){
    return console.log('Unable to connet to mongodb');
  }
  console.log('Connected to MongoDB server');

  //get the whole table. docs are the rows i think. get only the ones that have not been completed
//   db.collection('Todos').find({
//       _id: new ObjectID("59e510629abd0e955f93c095")
//     }).toArray().then((docs) => {
//       console.log('Todos');
//       console.log(JSON.stringify(docs,undefined,2));
//   }, (err) => {
//       console.log('Unable to fetch todos', err);
//   });

//gets the number of rows
// db.collection('Todos').find({completed: true}).count().then((count) => {
//     console.log(`Todos count: ${count}`);
    
// }, (err) => {
//     console.log('Unable to fetch count', err);
// });

db.collection('Users').find({name: 'Andrew'}).toArray().then((docs) => {
    console.log(docs);
}, (err) => {
    console.log('Unable to find it', err);
});

  //db.close();
});
