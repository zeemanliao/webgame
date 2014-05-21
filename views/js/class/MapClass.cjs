
/*
***********************************************************************************************
============================================地圖元件===========================================
***********************************************************************************************
*/
var MapClass = Object.Extend(BaseViewClass);

MapClass.prototype.initialize=function(){
  this.base();
}
MapClass.prototype.create=function(){
  var self = this;
  this.frame = $('#map_frame');
 }