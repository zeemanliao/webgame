
/*
***********************************************************************************************
============================================任務元件===========================================
***********************************************************************************************
*/
var QuestClass = Object.Extend(BaseViewClass);

QuestClass.prototype.initialize=function(){
  this.base();
}
QuestClass.prototype.create=function(){
  var self = this;
  this.frame = $('#quest_frame');
  this.content = $('.city_content','#quest_frame');
 }
