function Game(name) {
	var _self = this;
	this.name = name;
	this.server = null;
	this.channels = 
	{
		'message':
		function(data){
			_self.emit.call(_self, 'message', [data.type ,data.msg]);
		}
	}
}
jQuery.extend(Game.prototype, jQuery.eventEmitter);

Game.prototype.setRoute = function(server) {
	var _self = this;
	for (var i in this.channels) {
		var _channel = this.channels[i];
		server.on(i, function(data){
			_channel(data);
		});
	}
}

Game.prototype.set = function(name, fun) {
	if (!this[name]) {
		this[name] = fun;
	} else {
		console.log('Game.%s Alive',name);
	}
}

Game.prototype.use = function(channel, fun) {
	for (var channelName in this.channels) {
		if (channelName == channel){
			this.on(channel, fun);
		}
	}
}

