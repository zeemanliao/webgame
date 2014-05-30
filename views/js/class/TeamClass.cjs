
/*
***********************************************************************************************
============================================組隊元件===========================================
***********************************************************************************************
*/
var TeamClass = Object.Extend(BaseViewClass);

TeamClass.prototype.initialize=function(){
  this.base();
}
TeamClass.prototype.create=function(){
  var self = this;
  this.frame = $('#team_frame');
  this.content = $('.city_content','#team_frame');
 }
TeamClass.prototype.update=function(map){
}