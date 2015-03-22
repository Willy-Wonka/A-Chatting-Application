var http = require('http');
var url = require('url');
var fs = require('fs');

function handle(request, response)
{
    //console.log("in readFile.js");
    var path = url.parse(request.url).pathname;
    var port = url.parse(request.url).port;
    path = ".." + path;
    console.log(port);
    //console.log(path);
    fs.readFile(path, function(error,data){
                console.log("error: " + error);
                //console.log("data: " + data);
                if (error){
                response.writeHead(404);
                //response.write(error);
                response.write("Oops the file does not exist - 404");
                }
                else{
                response.writeHead(200, {"Content-Type": "text/html"});
                response.write(data);
                }
                
                response.end();
                });
    //console.log("end of readFile.js");

}
exports.handle = handle;