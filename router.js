var url = require('url');
var reconstructIndexHtml = require('./reconstructIndexHtml');
var reconstructUser = require('./reconstructUser');
var readFile = require('./readFile');
var querystring = require('querystring');
var testsjs = require('./test.sjs');

function route(request, response)
{
    var pathname = decodeURI(url.parse(request.url).pathname);
    var fileData = "No Data";
    var nothing = "";
    var port = request.url;
    console.log("port number is: " + port);
    if (endWithSlash(pathname) || !endWithExtension(pathname))
    {
        if(endWithSlashTilde(pathname))
        {
            //console.log("endWithSlashTilde\n" + pathname);
            reconstructUser.handle(request, response);
        }
        else
        {
            //console.log("endWithSlashOrnoExtension\n" + pathname);
            reconstructIndexHtml.handle(request, response);
        }
    }
    else if (getExtension(pathname) != '.sjs')
    {
        //console.log("in else if != .sjs\n + pathname");
        readFile.handle(request, response);
    }
    else if (getExtension(pathname) == '.sjs')
    {   //console.log("in else if != .sjs\n + pathname");
        try
        {
            if (request.method == 'GET')
            {
                var getData = querystring.parse(url.parse(request.url).query);
                
                testsjs.proceed
                (
                    getData, nothing,
                    function(html)
                    {
                        response.writeHead(200, {'Content-type': 'text/html'});
                        response.write(html);
                        response.end();
                    }
                );
            }
            else if (request.method == 'POST')
            {
                var listenData = "";
                
                request.addListener
                (
                    "data",
                    function(postDataChunk)
                    {
                        listenData += postDataChunk;
                    }
                );
                
                request.addListener
                (
                    "end",
                    function()
                    {
                        var postData = querystring.parse(listenData);

                        testsjs.proceed
                        (
                            nothing, postData,
                            function(html)
                            {
                                response.writeHead(200, {'Content-type': 'text/html'});
                                response.write(html);
                                response.end();
                            }
                         );
                    }
                );
            } // end else if (request.method == 'POST')
        } // end try
        catch(err)
        {
            delete require.cache[require.resolve(pathname)];
        }
    } // end else if (getExtension(pathname) == '.sjs')
    else
    {
        response.writeHead(200, "{'Content-type: text/plain'}");
        console.log("unavailable -> " + pathname);
        response.write("Error!\nThis webpage is not available!\n");
        response.write(fileData);
        response.end();
    }
}

function getExtension(filename)
{
    var i = filename.lastIndexOf('.');
    var j = filename.lastIndexOf('/');
    return (i < 0 || i < j) ? '' : filename.substr(i);
}

function endWithSlash(filename)
{
    var patt = new RegExp(/\/$/);
    //console.log("in function EWS " + filename);
    var res = patt.test(filename);
    //console.log("in function EWS " + res);
    
    return res;
}

function endWithExtension(filename)
{
    var patt = new RegExp(/\.[0-9a-z]+$/i);
    //console.log("in function EWE " + filename);
    var res = patt.test(filename);
    //console.log("in function EWE " + res);
    
    return res;
}

function endWithSlashTilde(filename)
{
    var patt = new RegExp(/^\/~/);
    var res = patt.test(filename);
    
    return res;
}

exports.route = route;