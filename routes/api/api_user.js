var db = require('../dblayer.js');

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
  return callback(200, "OK", {}, params);
};


exports.dispatch = {
  GET:    getUsers,
  DELETE: deleteUsers,
  PUT:    putOrPostUsers,
  POST:   putOrPostUsers
};
