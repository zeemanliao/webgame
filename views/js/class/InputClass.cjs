
/*
***********************************************************************************************
============================================輸入元件===========================================
***********************************************************************************************
*/
var InputClass = Object.Extend(BaseViewClass);

InputClass.prototype.initialize=function(){
  this.base();
}

InputClass.prototype.create=function(){
  var self = this;
  this.frame = $('#input_frame');
  this.content = this.frame.find('.msg_box');
  this.title = this.content.find('#title');
  this.text = this.content.find('#data');

  bind('#input_frame [gid=ok]',{
  	click:function(){
  		if (self.callback)
  			self.callback(self.text.val());
  		}
  	}
  );
  this.frame.bind("click",function(){
  	self.frame.fadeOut("fast");
  });

 }

InputClass.prototype.popup=function(data,callback){
	this.title.html(data.title);
	this.text.val("");
	this.text.focus();

	this.frame.fadeIn("fast");
	this.callback = callback;
}