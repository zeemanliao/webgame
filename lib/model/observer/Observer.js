module.exports=Observer;

function Observer ()
{
	this.obServables = [];
}

Observer.prototype.updateObserver = function(args){
	throw new Error('Observer need define updateObserver(args) Method!');
}

Observer.prototype.addObservable = function(observable){
	for (var idx in this.obServables) {
		if (this.obServables[idx] === observable) {
			return;
		}
	}
	this.obServables.push(observable);
}

Observer.prototype.removeObservable = function(observable) {
	for (var idx in this.obServables) {
		if (this.obServables[idx] === observable) {
			var _obServables = this.obServables[idx];
			this.obServables.splice(idx,1);
			_obServables.removeObserver(this);
			console.log('removeObservable');
			return;
		}
	}
}

