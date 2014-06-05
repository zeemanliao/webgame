
/*
***********************************************************************************************
============================================戰鬥元件===========================================
***********************************************************************************************
*/
var BattleClass = Object.Extend(BaseViewClass);

BattleClass.prototype.initialize=function(){
	this.ver = 0;
  this.base();
}
BattleClass.prototype.create=function(){
  var self = this;
  this.frame = $('#battle_frame');
  this.content = $('.battle_content','#battle_frame');
  live('.battle_button',{
    click:function (event) {
      self.city($(this));
      }
  });
}

BattleClass.prototype.reflush=function(){

}

BattleClass.prototype.update=function(){

}