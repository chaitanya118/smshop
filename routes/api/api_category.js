//var db = require('../dblayer.js');

var getCategories = function(params, callback) {
   console.log('In getCategories function');
  return callback(200, "OK", {}, result);

};


var deleteCategories = function(params, callback) {
  console.log('In deleteUser function');
  return 0;
};


var putOrPostCategories = function (params, callback) {
   console.log('In putOrPostUser function');
  return callback(200, "OK", {}, params);
};


exports.dispatch = {
  GET:    getCategories,
  DELETE: deleteCategories,
  PUT:    putOrPostCategories,
  POST:   putOrPostCategories
};
