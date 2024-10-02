html_server.js
function start_html_server() {
    const http = require('http');
    const fs = require('fs');

    const hostname = '0.0.0.0';
    const port = 8080;

    const server = http.createServer(function(request, response) {
        response.writeHeader(200, {"Content-Type": "text/html"});
        html = fs.readFileSync('./index.html', 'utf-8');
        response.write(html);
        response.end();
    }).listen(port, hostname, () => {
        console.log("Server running at http://cd5ea9aa8-3e95.docode.fi.qwasar.io");
        console.log("Replace cd5ea9aa8-3e95.docode by your current workspace ID");
        console.log("(look at the URL of this page and https://cd5ea9aa8-3e95.docode.fi.qwasar.io, cd5ea9aa8-3e95.docode is your workspace ID and fi is your zone)");
    });
}

start_html_server();