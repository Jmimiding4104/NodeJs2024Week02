require('dotenv').config();
require('../connections');
const http = require('http');
const app = require('../server');
const server = http.createServer(app);
server.listen(process.env.PORT || 3005);