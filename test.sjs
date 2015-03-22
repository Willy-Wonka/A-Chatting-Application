exports.proceed = function (_GET, _POST, callback)
{
    var html_content = '';

    html_content += '<!DOCTYPE html><html><body>';

    if (_GET != '')
    html_content += 'GET -> Hello Mr. ' + _GET['first_name'] + " " + _GET['last_name'] + '!\n';
    else
    html_content += 'POST -> Hello Mr. ' + _POST['first_name'] + " " + _POST['last_name'] + '!\n';

    html_content += '</body></html>';

    callback(html_content);
}