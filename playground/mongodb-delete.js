//connect to db
//const MongoClient = require ('mongodb').MongoClient;
const {MongoClient, ObjectID} = require ('mongodb');//destructure

// connect to the db 
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
  if(err){
    return console.log('Unable to connet to mongodb');
  }
  console.log('Connected to MongoDB server');

  //deleteMany
//   db.collection('Users').deleteMany({name: 'Andrew'}).then((result) => {
//       console.log(result.result);
//   });

  //deleteOne
//   db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
//       console.log(result.result);
//   });

  //findONeandDelete
  db.collection('Users').findOneAndDelete({
      _id: new ObjectID("59e50ad81c463206ecec2fc4")
    }).then((result) => {
      console.log(result);
  });

  //db.close();
});