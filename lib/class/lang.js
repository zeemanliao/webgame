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
		return 'Can\'t find Error Code:'+code;
	return code + ':' + lang.err[code];
}

Lang.base = function(code){
	if (!lang.base[code])
		return 'Can\'t find Base Code:'+code;
	return lang.base[code];
}

Lang.txt = function(code){
	if (!lang.txt[code])
		return 'Can\'t find Txt Code:'+code;
	return lang.txt[code];
}
