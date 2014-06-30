var lang = require('../../data/lang');

module.exports = {
	err:function(code){
		if (!lang.err(code))
			return 'Can\'t find Error Code:'+code;
		return lang.err(code);
	},
	base:function(code){
		if (!lang.base(code))
			return 'Can\'t find Base Code:'+code;
		return lang.base(code);
	},
	txt:function(code){
		if (!lang.txt(code))
			return 'Can\'t find Txt Code:'+code;
		return lang.txt(code);
	}
}