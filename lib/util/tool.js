/*
	注意,此目錄修改不會重啟Node
*/
var day_list = ['日', '一', '二', '三', '四', '五', '六'];

module.exports = {

	isUndefinedOrNull:function(d){
		if (typeof d === 'undefined' || d == null)
			return true;
		return false;
	},

	isNumeric:function(val){
		if (this.isUndefinedOrNull(val) || val =='')
			return false;
		return !isNaN(val);
	},

	verifyNumericRange:function(val,rangeMin,rangeMax){
		var _val = parseFloat(val);
		return _val >= parseFloat(rangeMin) &&
					 _val <= parseFloat(rangeMax);
	},

	getRandom:function(min,max){
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},

	getNow:function(){
		var d = new Date();

		return d.getFullYear() 	+ '年' + 
						(d.getMonth() + 1) + '月' + 
						d.getDate() + '日(' + 
						day_list[d.getDay()] +')' +
						d.getHours() + '點' + 
						d.getMinutes() + '分' + 
						d.getSeconds();
	},

	getRandomWord:function(data){
			if (!this.isNumeric(data.length))
				data.length = 20;

			if (!data.possible)
				data.possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	    var _text = "";

	    for( var i=0; i < data.length; i++ )
	        _text += data.possible.charAt(Math.floor(Math.random() * data.possible.length));

	    return _text;
	},

	replace:function(data, args){
		var _data = data;

		if (typeof(args)==='string') {
			_data = _data.replace('$', args);
			
		} else if (typeof(args)==='array'){
			for (var i in args){
				var rep = args[i];
				_data = _data.replace('$', rep);
			}
		}
		return _data;
	}
}