/*
***********************************************************************************************
============================================訊息元件===========================================
***********************************************************************************************
*/
var MessageClass = Object.Extend(BaseViewClass);

MessageClass.prototype.initialize=function(){
  this.base();
}

MessageClass.prototype.create=function(){
  var self = this;
	this.frame = $('#msg_frame');
  this.msg = $('#msg');

  this.frame.bind("click",function(){self.click()});
}
MessageClass.prototype.click=function(){
    if (this.loginout){
      location.href='/';
    } else {
       this.frame.fadeOut("fast");
    }
  }

MessageClass.prototype.show= function(val){
  if (!this.frame.is(":visible")){
    $('#load_frame').hide();
    this.msg.html(val);
    this.frame.fadeIn("fast");
  }
}
