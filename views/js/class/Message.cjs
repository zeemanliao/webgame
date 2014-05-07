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
  	this.frame.className = 'cs_msgframe';
  	this.frame.innerHTML = '<div CLASS="cs_msgbox">'+
                            '<h2>訊息</h2>'+
                            '<hr>'+
                            '<h3></h3>'+
                            '</div>';
    this.msg = this.frame.lastChild.lastChild;

    document.body.appendChild(this.frame);
}
MessageClass.prototype.click=function(){
    if (this.loginout){
      location.href='/';
    } else {
      this.vis=false;
    }
  }

MessageClass.prototype.show= function(val,loginout){
    if (!this.vis){
      this.msg.innerHTML = val;
      this.vis=true;
      this.loginout = loginout;
    }
  }


