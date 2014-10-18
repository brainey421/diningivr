var http = require('http');
var menus = require('./menus');
var address = '192.168.1.108';
var port = process.env.PORT || 5000;
http.createServer(function (request, response) {
	console.log("*** New Request (" + request.url + ") ***");
	var body = '';
	var isParseError = false;

	// Get request body
	request.on('data', function(data){
		try{
			body = eval('('+data+')');
		}
		catch (err){
			isParseError = true;
			console.log('Error parsing request body: ' + err);
			return;
		}
	});

	// Invoked after body is retrieved
    request.on('end', function () {
    	// Cancel if there was a parse error
    	if (isParseError) {
			console.log('400 Bad request (1)');
			response.writeHead(400, {'Content-Type': 'text/plain'});
			response.end('Bad request');
    		return;
    	}

		console.log('body=' + JSON.stringify(body));

		// Check request URL and method
		if (request.url.toLowerCase() == '/nextaction' && request.method == 'POST'){
			var jsonResponse = '';

			// Determine appropriate action
			if (body.lastactionid == '' || body.lastactionid == undefined || body.lastactionid == null){
				jsonResponse ={
				    "action" : "play",
				    "message" : (function() {
				    	var str = "Which menu would you like to hear?";
				    	for(var i = 0; i < menus.diningCourts.length; i++) {
				    		str += " Press " + (i+1) + " for " + menus.diningCourts[i] + ".";
				    	}
				    	str += " To hear the options again, press " + (menus.diningCourts.length+1) + ".";
				    	return str;
				    })(),
				    "id" : "maingreeting"
				};
			}
			else if (body.lastactionid == 'maingreeting'){
				jsonResponse ={
				    "action" : "getdigits",
				    "id" : "maingreetinggetdigits"
				};
			}
			else if (body.lastactionid == 'maingreetinggetdigits' && body.lastdigitsreceived != null && body.lastdigitsreceived <= menus.diningCourts.length){
				jsonResponse ={
				    "action" : "play",
				    "message" : (function() {
				    		var i = body.lastdigitsreceived-1;
				    		return menus.diningCourts[i] + " is serving " + menus.getMenu(i);
				    	})(),
				    "id" : "menu"
				};
			}
			else if (body.lastactionid == 'maingreetinggetdigits'){
				jsonResponse = {"id": null};
			}
			else if (body.lastactionid == 'menu'){
				jsonResponse ={"id": null};
			}

			// Send response
			console.log('response='+JSON.stringify(jsonResponse));
			response.writeHead(200, {'Content-Type': 'text/json'});
			response.end(JSON.stringify(jsonResponse));
			console.log("STILL ALIVE");
			return;
		}

		console.log('400 Bad request (2)');
		response.writeHead(400, {'Content-Type': 'text/plain'});
		response.end('Bad request');
    });

}).listen(port, address);
console.log('Server running at http://'+address+':'+port+"/");
