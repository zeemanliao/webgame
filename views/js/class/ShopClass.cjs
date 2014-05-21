
/*
***********************************************************************************************
============================================商店元件===========================================
***********************************************************************************************
*/
var ShopClass = Object.Extend(BaseViewClass);

ShopClass.prototype.initialize=function(){
  this.base();
}
ShopClass.prototype.create=function(){
  var self = this;
  this.frame = $('#shop_frame');
 }