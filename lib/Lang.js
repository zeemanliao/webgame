function Lang() {
	this.data = {};
}

Lang.prototype.setData = function(data){
	this.data = data;
}


Lang.create = function(language) {
	var _lang = new Lang();
	_lang.setData(language);
	console.log('Load Language');
	return _lang;
}

Lang.prototype.err = function(code, args){
	if (!this.data.err[code])
		return code;
	return processArgs(this.data.err[code], args);
}

Lang.prototype.base = function(code, args){
	if (!this.data.base[code])
		return code;
	return processArgs(this.data.base[code], args);
}

Lang.prototype.txt = function(code, args){
	if (!this.data.txt[code])
		return code;
	return processArgs(this.data.txt[code], args);
}

module.exports = Lang;

function processArgs(msg, args){
	var _msg = msg;
	
	if (typeof(args)==='string' || typeof(args)==='number') {
		_msg = _msg.replace('$',args);
	} else if (typeof(args)==='array' || typeof(args)==='object'){
		for (var i in args){
			var rep = args[i];
			_msg = _msg.replace('$',rep);
		}
	}
	return _msg;
}