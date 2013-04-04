var db = require('../dblayer');
var config = require('../config');

exports.onError = function(err, callback) {
  console.error("UNEXPECTED ERROR " + err);
  console.error("STACK", err.stack);
  return callback(500, "UNEXPECTED INTERNAL ERROR");
}

var getUsers = function(params, callback) {
   console.log('In getUsers function');
  return callback(200, "OK", {}, result);

};


var deleteUsers = function(params, callback) {
  console.log('In deleteUser function');
  return 0;
};


var putOrPostUsers = function (params, callback) {
   console.log('In putOrPostUser function');
   var string = "INSERT INTO [dbo].[users] VALUES(6760,'fundu','chaitanya118@gmail.com',CAST(1 AS BIT),CAST(1 AS BIT),'0123456789','333031',1234,5678,1)";
   var results = db.executeStatement(string);
  return callback(200, "OK", {}, results);
};


exports.dispatch = {
  GET:    getUsers,
  DELETE: deleteUsers,
  PUT:    putOrPostUsers,
  POST:   putOrPostUsers
};
