var services = {
  user: require("./api_user"),
  offer: require("./api_offer"),
  category: require("./api_category")
};

function sendResults(res, params, status, statusText, headers, result) {
  // Default values for missing parameters
  if (typeof headers === "undefined") headers = {};
  if (typeof result === "undefined") result = {};

  // Send out JSON result; don't keep connection alive
  headers["Connection"] = "close";
  headers["Content-Type"] = "application/json";
  res.writeHead(status, statusText, headers);

  // Send out JSONP if "callback" parameter was given; else, just JSON
  if (typeof params["callback"] !== "undefined")
    res.end(params["callback"] + "(" + JSON.stringify(result) + ");");
  else {
    res.end(JSON.stringify(result));
    }
};

exports.routeCall = function (req, res) {
  //  For PUT/POST methods, wait until the
  //  complete request body has been read.
  if (req.method==="POST" || req.method==="PUT") {
    
      console.log('[RouteCall] REQ.Body: ' + req.body.name);
    return routeParse(req, res, req.body);
    /*req.on("end", function(){s
         return routeParse(req, res, body);
         })
      */
  } else {
    console.log('In Route GET Call');
    return routeParse(req, res, "");
  }
};

function routeParse(req, res, body) {
  // Get parameters, both from the URL and the request body
  var urlObj = require("url").parse(req.url, true);
  var params = [];
  
  /* Query can be set this way, so that it would be converted to JSON obejct by expressjs itself
         // GET /shoes?order=desc&shoe[color]=blue&shoe[type]=converse
         query = { order : desc,                               req.query.order      req.query.shoe.color    req.query.shoe.type
                        shoe : {color: blue,                      // => "desc"            // => "blue"                     // => "converse"
                                    type: converse
                                    }
                        }
     */
  params['query'] = req.query;
  
  //Body is expected in JSON format, Content-type: has to be set to application/json
  params['data'] = req.body;//for (var p in req.body)

  // Provide path components to extract parameters from it
  params["path"] = urlObj.pathname.split("/");

  // If present, a "_method" parameter overrides the HTTP method
  if (typeof params._method === "undefined")
    params._method = req.method;

  // Analyze the URL to decide what service to call
  // ul will be like /api/user/get|add|delete
  var toCall = params["path"][2];

  if (typeof services[toCall] === "undefined")
    return sendResults(res, params, 404, "SERVICE NOT FOUND");

  if (typeof services[toCall]["dispatch"][params._method] === "undefined")
    return sendResults(res, params, 400, "WRONG METHOD " + params._method);

  // Dispatch call!
  return services[toCall]["dispatch"][params._method](params,
    function(status, statusText, headers, result){
      sendResults(res, params, status, statusText, headers, result);
    });
}
