const express = require('express');
const app = express();
const zipkinMiddleware = require('zipkin-instrumentation-express').expressMiddleware;
const ZipkinTracer = require('./zipkinTracer');
const log = require('../services/logger/logger');

app.use(zipkinMiddleware({
    tracer: ZipkinTracer,
    serviceName: 'third_service'
}));


app.get('/', (req, res) => {
    
    log.info('thirdService started');
    
    res.send('hello from third service');
   
});


const server = app.listen(8020, () => {
    var host = server.address().address;
    var port = server.address().port;
   
    console.log('third service listening on http://%s%s', host, port);
});
server.on('connection', (socket) => {
console.log("A new connection was made by client");
socket.setKeepAlive(true);
});