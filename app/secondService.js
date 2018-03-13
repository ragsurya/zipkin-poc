const express = require('express');
const app = express();
const zipkinMiddleware = require('zipkin-instrumentation-express').expressMiddleware;
const ZipkinTracer = require('./zipkinTracer');
const log = require('../services/logger/logger');

app.use(zipkinMiddleware({
    tracer: ZipkinTracer,
    serviceName: 'Second_service'
}));


app.get('/', (req, res) => {
    log.info('secondService started');
    res.send('hello from secondService');
   
});

const server = app.listen(8010, () => {
    var host = server.address().address;
    var port = server.address().port;
   
    console.log('second service listening on http://%s%s', host, port);
});