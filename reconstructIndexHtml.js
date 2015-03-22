var url = require('url');

function handle(request, response)
{
    var pathname = decodeURI(url.parse(request.url).pathname);
    var host = "http://cs.tru.ca/";
    
    var port = url.parse(request.url).port;
    console.log(port);
    response.writeHead(301, {Location: host + "index.html"});
    response.end();
}

exports.handle = handle;