var lang = require('../../data/lang_cht');
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
