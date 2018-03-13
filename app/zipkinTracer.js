const { Tracer, BatchRecorder } = require('zipkin');
const { HttpLogger } = require('zipkin-transport-http');
const CLSContext = require('zipkin-context-cls');

const ctxImpl = new CLSContext();

const recorder = new BatchRecorder({
    logger: new HttpLogger({
        endpoint: 'http://zipkin-web:9411/api/v2/spans'
    })
});

const ZipkinTracer = new Tracer({ ctxImpl, recorder});

module.exports = ZipkinTracer;