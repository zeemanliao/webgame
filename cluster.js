var cluster = require('cluster');
var os = require('os');

var numCPUs = os.cpus().length;

var workers = {};
if(cluster.isMaster) {


	for (var i =0; i < numCPUs; i++) {
		var worker = cluster.fork();
		workers[worker.pid] = worker;
	}

  cluster.on('fork', function (worker) {
      console.log('[master] ' + 'fork: worker' + worker.id);
  });

  cluster.on('online', function (worker) {
      console.log('[master] ' + 'online: worker' + worker.id);
  });

  cluster.on('listening', function (worker, address) {
      console.log('[master] ' + 'listening: worker' + worker.id + ',pid:' + worker.process.pid + ', Address:' + address.address + ":" + address.port);
  });

  cluster.on('disconnect', function (worker) {
      console.log('[master] ' + 'disconnect: worker' + worker.id);
  });

  cluster.on('exit', function(worker){
		delete workers[worker.pid];
		worker = cluster.fork();
		workers[worker.pid] = worker;
	});
} else {
	var app = require('./app');

}