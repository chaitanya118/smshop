var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
//var config = require('./config');
var config = {
  "server": "oitxn446ex.database.windows.net",
  "userName": "babu@oitxn446ex.database.windows.net",
  "password": "Cha3it2u1",
  
  options:  {
               "encrypt": true,
               //port : 1433,
               "database": "smshtest",
               connectTimeout : 30000,
               //requestTimeout : 15000,
               //cancelTimeout  : 5000,
               debug: {
               packet: true,
               data: true,
               payload: true,
               token: true,
               log: true
             }
            }
  
};


exports.initDB = function () {
   

};
exports.executeStatement = function (string) {
console.log('Creating Connection');
   var rows = new Array();
   var count = 0;
   var connection = new Connection(config);
   connection.on('connect', function(err) {
          // If no error, then good to go...
          if(err) {
            console.log('Errd in connect, ' + err);
          } else {
            console.log('Connected sucessfully to ' + config.server);
          }
          
           request = new Request(string, function(err, rowCount) {
             if (err) {
               console.log(err);
             } else {
               console.log(rowCount + ' rows');
             }

             connection.close();
           });

           request.on('row', function(columns) {
               rows[count++] = columns;
             columns.forEach(function(column) {
               if (column.value === null) {
                 console.log('NULL');
               } else {
                 console.log(column.value);
               }
             });
           });

           request.on('done', function(rowCount, more) {
             console.log(rowCount + ' rows returned');
           });

           connection.execSql(request);
        }
      );

      connection.on('debug', function(text) {
       console.log('[DEBUG]:' +text);
     }
   );

  // In SQL Server 2000 you may need: connection.execSqlBatch(request);
  
  return rows;
}
