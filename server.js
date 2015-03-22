var http = require('http');
var https = require('https');
var pem = require('pem');
var ws_server = require('./ws_server.sws');

function start(route)
{
    // HTTP server
    var server = http.createServer(function(request, response) {
                                   route(request, response);
                                   });
    server.listen(42408);
    
    // WebSocket server integrated with HTTP server
    ws_server.start(server);  // WebSocket server: ws Node.js module
    
    // HTTPS server
    /*
    pem.createCertificate({days:100, selfSigned:true}, function(err, keys) {
                          https.createServer({key: keys.serviceKey, cert: keys.certificate}, function(request, response) {
                                             route(request, response);
                                             }).listen(42409);
                          });*/
}

exports.start = start;