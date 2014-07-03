var util = require('util');
var events = require('events');

function SocketClient(socket) {
	var socket = socket;

	this.on('send', function(com, com2, data){
		socket.emit('update Data',{
			com: com,
			com2: com2,
			data: data
		});
	});
}

util.inherits(SocketClient, events.EventEmitter);
module.exports = SocketClient;
