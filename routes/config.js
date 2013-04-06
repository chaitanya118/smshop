//---------------------------------------------------------------------------------------------------------------------------------
// File: config.js
// Contents: configurations
//---------------------------------------------------------------------------------------------------------------------------------

// server connection info
var driver = 'SQL Server Native Client 10.0';
var server = 'tcp:oitxn446ex.database.windows.net,1433';
var user = 'fundu@oitxn446ex';
var pwd = 'Cha3it2u1';
var database = 'smshtest';
var useTrustedConnection = true;
var conn_str = "Driver={" + driver + "};Server=" + server + ";" + (useTrustedConnection == true ? "Trusted_Connection={Yes};" : "UID=" + user + ";PWD=" + pwd + ";") + "Database={" + database + "};";

var conn_string = "Driver={SQL Server Native Client 10.0};Server=tcp:oitxn446ex.database.windows.net,1433;Database=smshtest;Uid=fundu@oitxn446ex;Pwd=Cha3it2u1;Encrypt=yes;Connection Timeout=30;";

// The following need to be exported for building connection strings within a test...
exports.server = server;
exports.user = user;
exports.pwd = pwd;
// Driver name needs to be exported for building expected error messages...
exports.driver = driver;
// Here's a complete connection string which can be shared by multiple tests...
exports.conn_str = conn_string;