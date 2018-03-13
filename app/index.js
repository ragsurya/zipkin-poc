const fork = require('child_process').fork;


// fork creates a new node process
fork('./app/helloService.js');
fork('./app/secondService.js');
fork('./app/thirdService.js');