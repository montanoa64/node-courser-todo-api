//connect to db
//const MongoClient = require ('mongodb').MongoClient;
const {MongoClient, ObjectID} = require ('mongodb');//destructure

// connect to the db 
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
  if(err){
    return console.log('Unable to connet to mongodb');
  }
  console.log('Connected to MongoDB server');

//   db.collection('Todos').findOneAndUpdate({
//       _id: new ObjectID('59e5209a9abd0e955f93c480')
//   }, {
//       $set: {
//           completed: true
//       }
//   }, {
//       returnOriginal: false
//   }).then((result) => {
//       console.log(result);
//   });

db.collection('Users').findOneAndUpdate({
    _id: new ObjectID ("59e430620e2ee721586bac91")
},{
    $set: {
        name: 'Andrew'
    },
    $inc: {
        age: 1
    }
},{
    returnOriginal: false
}).then((result) => {
    console.log(result);
});

  //db.close();
});