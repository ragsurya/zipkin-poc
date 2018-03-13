
const express = require('express');
const app = express();
const zipkinMiddleware = require('zipkin-instrumentation-express').expressMiddleware;
const ZipkinTracer = require('./zipkinTracer');
const fetch = require('node-fetch');
const wrapFetch = require('zipkin-instrumentation-fetch');
const zipkinFetch = wrapFetch(fetch, {
  tracer: ZipkinTracer,
  serviceName: 'first_service'
});
const log = require('../services/logger/logger');


app.use(zipkinMiddleware({
    tracer: ZipkinTracer,
    serviceName: 'svsvsvsvsvb'
}));


app.get('/', (req, res) => {
   Promise.all([
       zipkinFetch('http://localhost:8010'),
       zipkinFetch('http://localhost:8020'),
   ]).then(([first, last]) => {
    return Promise.all([
        first.text(),
        last.text()
    ]);
   }).then(([first, last])=> {
    res.send(`${first} ${last}`);
   })
   .catch(err => { 
       res.sendStatus(500);
       log.warn(err);
});
   
});

const server = app.listen(8000, () => {
    var host = server.address().address;
    var port = server.address().port;
   
    console.log('helloService listening on http://%s%s', host, port);
});