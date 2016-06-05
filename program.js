//console.log("HELLO WORLD");
//console.log(process.argv);


/* Exercise: MY FIRST ASYNC I/O!
var fs = require('fs');

fs.readFile(process.argv[2], function(err, data){
    var str = data.toString();
    count = 0;
    for (var i = 0; i < str.length; ++i){
        if (str[i] == '\n'){
            count += 1;
        }
    }
    console.log(count);
});
*/

/* Exercise: FILTERED LS
var fs = require('fs');

directory = process.argv[2];

fs.readdir(directory, function(err, list){
	//list is an array
	extension = '.' + process.argv[3];

	files = [];

	for (i = 0; i < list.length; ++i){

		if (list[i].indexOf(extension) >= 0){
			files.push(list[i]);
			console.log(list[i]);
		}
	}
	return files;


});
*/

/* Exercise: Make It Modular
var makeItModular = require('./makeItModular');

var dir = process.argv[2];
var ext = process.argv[3];

makeItModular(dir, ext, function(err, files){
	for (i=0; i < files.length; ++i){
		console.log(files[i]);
	}
});
*/

/* Exercise: HTTP Client
var http = require('http');

url = process.argv[2];

http.get(url, function(response){
	response.on('data', function(data){
		console.log(data.toString());
	});
});
*/

/* Exercise: HTTP COLLECT
var http = require('http');
var bl = require('bl');

url = process.argv[2];

http.get(url, function(response){
	response.pipe(bl(function(err, data){
		if (err){
			console.log(err);
		} else {
			console.log(data.length);
			console.log(data.toString());
		}
	}));
});
*/

/* Exercise: Juggling ASync
var http = require('http');
var urls = process.argv.slice(2);
results = [];
for (i = 0; i < urls.length; ++i){
	results[i]=null;
}



for (i = 0; i < urls.length; ++i){
	(function(i){
		http.get(urls[i], function(response){
			results[i]='';
			response.on('data', function(data){
				results[i] += data;
			});
			response.on('end', function(){
				//console.log(result.length);
				console.log(results[i]);
			})
		});
	})(i);
}
*/

/* learnyounode's solution
var http = require('http')  
var bl = require('bl')  
var results = []  
var count = 0  
   
function printResults () {  
	for (var i = 0; i < 3; i++)  
		console.log(results[i])  
}  
   
function httpGet (index) {  
	http.get(process.argv[2 + index], function (response) {  
		response.pipe(bl(function (err, data) {  
			if (err)  
				return console.error(err)  

			results[index] = data.toString()  
			count++  

			if (count == 3)  
				printResults()  
		}))  
	})  
}  

for (var i = 0; i < 3; i++)  
	httpGet(i)  
*/

/* Exercise: TCP Time Server
function check(item){
	if (item < 10){
		item = '0' + item;
	}
	return item;
}

var port = process.argv[2];
var net = require('net');
var server = net.createServer(function(socket){
	// socket handling logic
	// get current time
	var date = new Date();
	year = date.getFullYear();
	// getMonth() starts from 0, so we have to add 1
	month = date.getMonth()+1;
	day = date.getDate();
	hour = date.getHours();
	minutes = date.getMinutes();
	if (year){
		str = year + '-' + check(month) + '-' + check(day) + ' ' + check(hour) + ':' + check(minutes) + '\n';
	} else {
		str = '';
	}
	socket.write(str);
	socket.end();
});
server.listen(port);
*/

/* Exercise HTTP File Server
// https://docs.nodejitsu.com/articles/advanced/streams/how-to-use-fs-create-read-stream/
var port = process.argv[2];
var file = process.argv[3];
var http = require('http');
var server = http.createServer(function(req, res){
	// request handling logic
	// read the file
	var fs = require('fs');
	var readStream = fs.createReadStream(file);

	// This will wait until we know the readable stream is actually valid before piping
	readStream.on('open', function () {
		// This just pipes the read stream to the response object (which goes to the client)
		readStream.pipe(res);
	});

	// This catches any errors that happen while creating the readable stream (usually invalid names)
	readStream.on('error', function(err) {
		res.end(err);
	});
});
server.listen(port);
*/

/* Exercise : HTTP UpperCaserer
var port = process.argv[2];
var http = require('http');


var map = require('through2-map');



var server = http.createServer(function(req, res){
	if (req.method == 'POST') {
		req.pipe(map(function(chunk){
			// handle the chunk
			return chunk.toString().toUpperCase();
		})).pipe(res);
	} else {
		res.end('send me a POST\n');
	}
});
server.listen(port);
*/

/* Exercise: HTTP JSON API Server
var port = process.argv[2];
var http = require('http');
var url = require('url');



var routes = {
  "/api/parsetime": function(parsedUrl) {
    date = new Date(parsedUrl.query.iso);
    return {
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds()
    };
  },
  "/api/unixtime": function(parsedUrl) {
    return {unixtime: (new Date(parsedUrl.query.iso)).getTime()};
  }
};


var server = http.createServer(function(req, res){
	parsedUrl = url.parse(req.url, true);
	isQuery = routes[parsedUrl.pathname];
	if (isQuery) {
		res.writeHead(200, {"Content-Type": "application/json"});
		res.end(JSON.stringify(isQuery(parsedUrl)));
	}
	else {
		res.writeHead(404);
		res.end();
	}
});
server.listen(port);
*/