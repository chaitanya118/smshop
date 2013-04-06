//var db = require('../dblayer.js');

var get = function(params, callback) {
   console.log('[user.get]initiated.');
  return callback(200, "OK", {}, result);

};


var del = function(params, callback) {
  console.log('[user.delete]initiated.');
  return 0;
};


var update = function (params, callback) {
   console.log('[user.update]initiated.');
  return callback(200, "OK", {}, params);
};

var create = function (params, callback) {
   console.log('[user.create]initiated.');
  return callback(200, "OK", {}, params);
};

exports.dispatch = {
  GET:    get,
  DELETE: del,
  PUT:    update,
  POST:   create
};
