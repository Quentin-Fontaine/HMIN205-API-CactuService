const http = require('http');
const app = require('./app');

app.set('port', 8888);
const server = http.createServer(app);

server.listen(8888);
