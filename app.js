
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , restapi = require('./routes/api/router')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.post('/signup', function(req, res) {
	console.log("Express server 3 " + app.get('/'));
	res.sendfile('public/tpl/SignupView.html');
});

app.get('/', function(req, res) {
	console.log("Express server  " + app.get('/'));
	res.sendfile('public/tpl/WelcomeView.html');
});

app.get('/1', function(req, res) {
	console.log("Express server 1 " + app.get('/'));
	res.sendfile('public/tpl/RetailerHomeView.html');
});

app.post('/', function(req, res){
    console.log("test");
});

app.all('/api/*', restapi.routeCall);
app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
