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
  else
    res.end(JSON.stringify(result));
};

exports.routeCall = function (req, res) {
  //  For PUT/POST methods, wait until the
  //  complete request body has been read.
  console.log('In Route Call');
  if (req.method==="POST" || req.method==="PUT") {
    var body = "";
    req.on("data", function(data){
      body += data;
    })

    return routeParse(req, res, body);
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
  var params = urlObj.query;
  var bodyParams = require("querystring").parse(req.body);
  for (var p in bodyParams)
    params[p] = bodyParams[p];

  // Provide path components to extract parameters from it
  params["path"] = urlObj.pathname.split("/");

  console.log('[RParser] urlObj: ' + urlObj.pathname +'\t params[path]: ' + params["path"]);
  // If present, a "_method" parameter overrides the HTTP method
  if (typeof params._method === "undefined")
    params._method = req.method;

  // Analyze the URL to decide what service to call
  // ul will be like /api/user/get|add|delete
  var toCall = urlObj.pathname.split("/")[2];

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
