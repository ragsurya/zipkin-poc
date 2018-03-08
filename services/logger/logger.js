var bunyan = require('bunyan');
var log = bunyan.createLogger({name: 'myApp'});

module.exports = log;