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

Lang.err = function(code){
	if (!lang.err[code])
		return code;
	return code + ':' + lang.err[code];
}

Lang.base = function(code){
	if (!lang.base[code])
		return code;
	return lang.base[code];
}

Lang.txt = function(code){
	if (!lang.txt[code])
		return code;
	return lang.txt[code];
}
