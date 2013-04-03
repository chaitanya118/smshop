var db = require('msnodesql');
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
   var string = "INSERT INTO [dbo].[users] VALUES(6754,'fundu','chaitanya118@gmail.com',CAST(1 AS BIT),CAST(1 AS BIT),'0123456789','333031',1234,5678,1)";
   var results;
   db.query(config.conn_str, string, function (err, rows) {

            if (err)
               console.log('Error: ' + err);
               //return this.onError(err, callback);
            //if (rows.length == 0)
            //  return callback(403, "MUST SPECIFY VALID COUNTRY CODE");
            //var buffer = new Buffer('0123456789abcdef', 'hex');
            results = rows;
        });
  return callback(200, "OK", {}, results);
};


exports.dispatch = {
  GET:    getUsers,
  DELETE: deleteUsers,
  PUT:    putOrPostUsers,
  POST:   putOrPostUsers
};
