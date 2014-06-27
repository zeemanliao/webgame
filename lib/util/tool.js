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
		return Math.floor((Math.random()*max)+min);
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
	}

}