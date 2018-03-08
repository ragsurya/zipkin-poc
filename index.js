const fork = require('child_process').fork;


// fork creates a new node process
fork('./helloService.js');
fork('./secondService.js');
fork('./thirdService.js');