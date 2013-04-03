
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

/*
 * SET DB Connection and schema
 */

 exports.dbconn = function(req, res) {
 
 };