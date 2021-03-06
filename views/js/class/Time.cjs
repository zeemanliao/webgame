/*
***********************************************************************************************
============================================日期元件===========================================
***********************************************************************************************
*/
var TimeClass = Class.create();
TimeClass.prototype = {
	day_list : ['日', '一', '二', '三', '四', '五', '六'],
  initialize: function() {
  	var self = this;
  	this.frame = $('#show_time');
  	this.frame.html('時間載入中...');
		//顯示Server時間
		setInterval(
			function(){
		    self.timeCount(self)
			}, 1000);
  },
  timeCount: function(base) {
    if (SHOWDATE !== null)
    {
        SHOWDATE.setSeconds(SHOWDATE.getSeconds() + 1);
        var st = SHOWDATE.getFullYear() 	+ '年' + 
        				(SHOWDATE.getMonth() + 1) + '月' + 
        				SHOWDATE.getDate() 				+ '日(' + 
        				base.day_list[SHOWDATE.getDay()] +')</br>' +
        				SHOWDATE.getHours() 			+ '點' + 
        				SHOWDATE.getMinutes() 		+ '分' + 
        				SHOWDATE.getSeconds() 		+ '秒';
				$(this.frame).html(st);
    }
  }
}

