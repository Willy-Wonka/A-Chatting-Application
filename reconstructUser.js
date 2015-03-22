var url = require('url');

function handle(request, response)
{
    var pathname = decodeURI(url.parse(request.url).pathname);
    var port = url.parse(request.url).port;
    console.log(port);
    response.writeHead(301, {Location: "http://cs.tru.ca:42408/Lab7/test.html"});
    response.end();
}

exports.handle = handle;