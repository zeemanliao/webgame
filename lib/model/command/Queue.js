var util = require('util');
var Observable = require('../observer/Observable')
function Queue() {
	//Observable.call(this);
	this.before = new Observable();
	this.after = new Observable();
	this.interval = 100;
	this.actions = [];
}

Queue.create = function(){
	return new Queue();
}

//util.inherits(Queue, Observable);

Queue.prototype.put = function(action){
	this.actions.push(action);
}

Queue.prototype.run = function(){
	var act = this.actions.shift();
	if (act) {
		this.before.updateObserver(act);
		console.log('run '+act.fun);
		this.after.updateObserver(act);
	}
}

Queue.prototype.count = function() {
	return this.actions.length;
}

Queue.prototype.setTicker = function(interval) {
	this.interval = interval;	
}

Queue.prototype.start = function() {
	var self = this;
	this.stop();
	this.ticker = setInterval(function(){self.run()},this.interval);
}

Queue.prototype.stop = function(){
	if (this.ticker)
		clearInterval(this.ticker);
}



module.exports = Queue;