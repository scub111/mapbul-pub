var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(`NodeJS version is ${process.version}, IISNode version is ${process.env.IISNODE_VERSION}`);
}).listen(process.env.PORT);  