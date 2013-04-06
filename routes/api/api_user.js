/*
This class should get either User Object ot Set of users in
User Object would be in sync with DB if DB changes user object has to be changed.
*/
var db = require('../db/wrapper.js');
var config = require('../config');
var utils = require('./common.js');
var tablename = 'customers';
String.prototype.replaceAt=function(index, character) {
      return this.substr(0, index) + character + this.substr(index+character.length);
   }
var get = function(params, callback) {
   console.log('[user.get]initiated.');
   //var string = "INSERT INTO [dbo].[users] VALUES(6754,'fundu','chaitanya118@gmail.com',CAST(1 AS BIT),CAST(1 AS BIT),'0123456789','333031',1234,5678,1)";
     /* Query can be set this way, so that it would be converted to JSON obejct by expressjs itself
         // GET /shoes?order=desc&shoe[color]=blue&shoe[type]=converse
         query = { order : desc,                               req.query.order      req.query.shoe.color    req.query.shoe.type
                        shoe : {color: blue,                      // => "desc"            // => "blue"                     // => "converse"
                                    type: converse
                                    }
                        }
                        { select : ['fname', 'lname'],
                        where : { cust_id:'99', email:'x@gmail.com'}
                        }
     */
//     http://localhost:3000/api/user/get?select=first_name,last_name&where[cust_id]=99&where[email]=chaitanya118@gmail.com
   
   //db.buildString
   //db.executeStatement(string, params['query'], callback);
   db.select(tablename, params['query'], callback);
};


var del = function(params, callback) {
  console.log('[user.del]initiated.');
  return 0;
};

var update = function (params, callback) {
   console.log('[user.update]initiated.');

   db.update(tablename, params['data'], callback);  
};

var create = function (params, callback) {
   console.log('[user.create]initiated.');
   
   db.insert(tablename, params['data'], callback);  
};


exports.dispatch = {
  GET:    get,
  DELETE: del,
  PUT:    update,
  POST:   create
};
