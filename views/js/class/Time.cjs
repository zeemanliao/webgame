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
  	this.frame = $('show_time');
  	this.frame.className = 'cs_showtime';
  	this.frame.innerHTML = '時間載入中...';
		//顯示Server時間
		setInterval(
			function(){
		    self.timeCount(self)
			}, 1000);
  },
  timeCount: function(base) {
    if (SHOWDATE !== null)
    {
      if(!socket.socket.connected){
        //location.href='/';
      }
        SHOWDATE.setSeconds(SHOWDATE.getSeconds() + 1);
        var st = SHOWDATE.getFullYear() 	+ '年' + 
        				(SHOWDATE.getMonth() + 1) + '月' + 
        				SHOWDATE.getDate() 				+ '日</br>(' + 
        				base.day_list[SHOWDATE.getDay()] +')' +
        				SHOWDATE.getHours() 			+ '點' + 
        				SHOWDATE.getMinutes() 		+ '分' + 
        				SHOWDATE.getSeconds() 		+ '秒';
				put(base.frame, st);
    }
  }
}

