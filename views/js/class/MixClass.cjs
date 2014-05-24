
/*
***********************************************************************************************
============================================工匠元件===========================================
***********************************************************************************************
*/
var MixClass = Object.Extend(BaseViewClass);

MixClass.prototype.initialize=function(){
  this.base();
}
MixClass.prototype.create=function(){
  var self = this;
  this.frame = $('#mix_frame');
  this.content = $('.city_content','#mix_frame');
 }