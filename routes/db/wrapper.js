var sql = require('msnodesql');
var config = require('../config');

//var conn = sql.open(config.conn_str);
var conn = null;

exports.onError = function(err, callback) {
  console.error("UNEXPECTED ERROR " + err);
  console.error("STACK", err.stack);
  return callback(500, "UNEXPECTED INTERNAL ERROR");
}

exports.executeStatement = function(string, params, callback) {
   
   if(conn === null) {
      sql.open( config.conn_str, function( err, new_conn ) {

            if (err)
               console.log('[DB.createConnection]Error: ' + err);
            
            c = new_conn;
           });
   }
   //queryRaw
   var colums =[]; var data = [];
   for (var p in params) {
   }
   sql.query(config.conn_str, string, params, function (err, rows) {

            if (err)
               console.log('[DB.executeStatement]Error: ' + err);
               //return this.onError(err, callback);
            //if (rows.length == 0)
            //  return callback(403, "MUST SPECIFY VALID COUNTRY CODE");
            //var buffer = new Buffer('0123456789abcdef', 'hex');
            return callback(200, "OK", {}, rows);
        });
  
};

exports.select = function(table, condition, callback) {
   // select * from table where cust_id=99 and..
   /*
   condition = { select : [fname, lname],
                        where : { cust_id:99, email:x@gmail.com}
                        }
   */
   console.log('select ' + condition.select.toString());
   
   var qstring = 'SELECT ' + condition.select.toString() + ' FROM ' + table + ' WHERE ';
   
   var len = Object.keys(condition.where).length;
   console.log('Length: ' + len);
   for(var p in condition.where) {
      qstring += p+'=\''+condition.where[p]+'\'';
      len--;
      if(len != 0)
      qstring += ' and ';
   }
   console.log('STATEMENT: ' + qstring);

   sql.query(config.conn_str, qstring, function (err, rows) {

            if (err)
               console.log('[DB.executeStatement]Error: ' + err);

            return callback(200, "OK", {}, rows);
        });
  
};

exports.insert = function(table, condition, callback) {
   // INSERT INTO table (cust_id, first_name, last_name...)  VALUES(6754,'fundu','chaitanya118@gmail.com',CAST(1 AS BIT),CAST(1 AS BIT),'0123456789','333031',1234,5678,1)";
   /*
   condition = { values: { cust_id:99,
                                          first_name:'Krishna',
                                          last_name:'Chaitanya'
                                          
                        }
   */
   var qstring = 'INSERT INTO ' + table + ' ';
   
   var len = Object.keys(condition.values).length;
   console.log('Length: ' + len);
   var columns = "(", data = "(";
   for(var p in condition.values) {
      columns += p;
      data += "'"+condition.values[p]+"'";
      len--;
      if(len != 0) {
         columns += ','; data += ',';
      } else {
         columns += ')'; data += ')';
      }
   }
   qstring += columns + ' VALUES ' + data;
   
   console.log('STATEMENT: ' + qstring);

   //queryRaw
   sql.query(config.conn_str, qstring, function (err, rows) {

            if (err)
               console.log('[DB.executeStatement]Error: ' + err);

            return callback(200, "OK", {}, rows);
        });
  
};

exports.update = function(table, condition, callback) {
   // UPDATE table  SET(cust_id='999', first_name='Kotesh', last_name='Rao' WHERE phone='0123456789' AND last_name='Rao'
   /*
   condition = { set: { cust_id:99, first_name:'Krishna', last_name:'Chaitanya'},
                         where : { cust_id:99, email:x@gmail.com}
                        }
   */
   var qstring = 'UPDATE ' + table;
   
   for(var q in condition) {
   var len = Object.keys(condition[q]).length;
   console.log('Length: ' + len);
   var columns = "(", data = "(";
   qstring += ' '+q+' ';
   for(var p in condition[q]) {
      qstring += p+'=\''+condition[q][p]+'\'';
      len--;
      if(len != 0)
         if(q === 'set') 
            qstring += ' , ';
         else
            qstring += ' and ';
   }
   }
   
   
   console.log('STATEMENT: ' + qstring);

   //queryRaw
   sql.query(config.conn_str, qstring, function (err, rows) {

            if (err)
               console.log('[DB.executeStatement]Error: ' + err);

            return callback(200, "OK", {}, rows);
        });
  
};