
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  /*, session = require('client-sessions')*/
  , restapi = require('./routes/api/router')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var MemoryStore = express.session.MemoryStore;
var sessionStore = new MemoryStore();
var connect = require('connect');
var Session = connect.middleware.session.Session;
var cookie = require('cookie');

var app = express();

// all environments
app.configure( function() { 
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.methodOverride());
app.use(express.session({
        store : sessionStore,
        secret : 'secret',
        key : 'express.sid'
    }));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
	});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.post('/channel', function(req, res) {
	console.log("Extracting channel info " + app.get('/'));
	req.session.channel = 'email';
	res.render('SignupView');
});

app.get('/transaction', function(req, res) {
	console.log("Extracting channel info " + app.get('/'));
	var offers = {"Buy Dosa":25, "Buffet Lunch for 2":100,"Comments on Yelp":5};
	res.render('CustomerPointsView',{offers:offers, points:50});
});

app.post('/signup', function(req, res) {
	console.log("Extracting channel info signup");
	console.log(req.body.fname);
	console.log(req.body.gender);
	console.log(req.body.email);
	console.log(req.body.phoneno);
	console.log(req.body.zip);
	console.log(req.body.promo);
	console.log("channel: "+req.session.channel);
	var promo = req.body.promo;
	if(promo != null && promo != undefined && promo != "" && promo.indexOf("1234") == 0) {
		res.render('RetailerOffersView');
	} else {
		res.render('SearchView',
				{title:'Search'});
	}
	//connecttoDB();
});

app.post('/search', function(req, res) {
	console.log(req.body.zip);
	console.log(req.body.storename);
	var storename = req.body.storename;
	if(storename != null && storename != undefined && storename != "") {
		req.session.storeID = storename;
		res.render('PointsView',
			{title:'Points', points:50});
	} else {
		res.render('SearchView',
				{title:'Search'});
	}
});



app.get('/', function(req, res) {
	console.log("Express server  " + app.get('/'));
	res.render('WelcomeView');
});

app.all('/api/*', restapi.routeCall);
app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
