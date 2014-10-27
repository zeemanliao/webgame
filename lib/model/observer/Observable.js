module.exports=Observable;

function Observable ()
{
	this.observers = [];
}

Observable.prototype.updateObserver = function(args){
	for (var idx in this.observers) {
		this.observers[idx].updateObserver(args);
	}
}

Observable.prototype.addObserver = function(observer){
	for (var idx in this.observers) {
		if (this.observers[idx] === observer) {
			return;
		}
	}
	observer.addObservable(this);
	this.observers.push(observer);
}

Observable.prototype.removeObserver = function(observer) {
	for (var idx in this.observers) {
		if (this.observers[idx] === observer) {
			var _observer = this.observers[idx];
			this.observers.splice(idx, 1);
			_observer.removeObservable(this);
			console.log('removeObserver');
			return;
		}
	}
}