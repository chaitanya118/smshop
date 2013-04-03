var sql = require('msnodesql');
var config = require('./config');

//var conn = sql.open(config.conn_str);

exports.onError = function(err, callback) {
  console.error("UNEXPECTED ERROR " + err);
  console.error("STACK", err.stack);
  return callback(500, "UNEXPECTED INTERNAL ERROR");
}

exports.query = function(string, callback) {
   var results;
   sql.query(config.conn_str, string, function (err, rows) {

            if (err)
               return this.onError(err, callback);
            if (rows.length == 0)
              return callback(403, "MUST SPECIFY VALID COUNTRY CODE");
            //var buffer = new Buffer('0123456789abcdef', 'hex');
            results = rows;
        });
        return results;
};
