
/*
***********************************************************************************************
============================================活動元件===========================================
***********************************************************************************************
*/
var ActClass = Object.Extend(BaseViewClass);

ActClass.prototype.initialize=function(){
  this.base();
}
ActClass.prototype.create=function(){
  var self = this;
  this.frame = $('#act_frame');
 }