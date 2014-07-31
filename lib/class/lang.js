var tool = require('../util/tool');
var lang = require('../settings').game.lang;


var langs = {
	cht:require('../../data/lang/cht')
};

var lang = langs[require('../settings').game.lang];
if (tool.isUndefinedOrNull(lang)) {
	lang = langs.cht;
}

var Lang = module.exports = {};

Lang.err = function(code, args){
	if (!lang.err[code])
		return code;
	return processArgs(lang.err[code], args);
}

Lang.base = function(code, args){
	if (!lang.base[code])
		return code;
	return processArgs(lang.base[code], args);
}

Lang.txt = function(code, args){
	if (!lang.txt[code])
		return code;
	return processArgs(lang.txt[code], args);
}

function processArgs(msg, args){
	var _msg = msg;
	if (typeof(args)==='string') {
		_msg = _msg.replace('$',args);
	} else if (typeof(args)==='array'){
		for (var i in args){
			var rep = args[i];
			_msg = _msg.replace('$',rep);
		}
	}
	return _msg;
}