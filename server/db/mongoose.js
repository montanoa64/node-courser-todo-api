var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds013172.mlab.com:13172/todo_app' || 'mongodb://localhost:27017/TodoApp');

module.exports = {
    mongoose
};