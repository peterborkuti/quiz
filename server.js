var http = require('http');
var fs = require('fs');
var path = require('path');
var mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css",
	"json": "text/json" };

http.createServer(function (request, response) {
    console.log('request starting...');
	
	var filePath = '.' + request.url;
	if (filePath == './')
		filePath = './index.htm';
	console.log("filePath:"+filePath);
	var extname = path.extname(filePath).substr(1);
    console.log("extname:"+extname);
	var contentType = mimeTypes[extname];
	if (contentType == "") {
		contentType = 'text/html';
	}
    console.log("content-type:"+contentType);

	path.exists(filePath, function(exists) {
	
		if (exists) {
			fs.readFile(filePath, function(error, content) {
				if (error) {
					response.writeHead(500);
					response.end();
                    console.log("500");
				}
				else {
					response.writeHead(200, { 'Content-Type': contentType });
					response.end(content, 'utf-8');
                    console.log("response sent");
				}
			});
		}
		else {
			response.writeHead(404);
			response.end();
            console.log("404");
		}
	});
	
}).listen(8125);
console.log('Server running at http://127.0.0.1:8125/');
