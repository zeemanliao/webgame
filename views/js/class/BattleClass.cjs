
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
  this.data = {
    team:{},
    members:{}
  };
  this.frame = $('#battle_frame');
  this.content = this.frame.find('#battle_content');
  this.enemy = this.content.find('#enemy');
  this.team = this.content.find('#team');
  
  live('.battle_button',{
    click:function (event) {
      self.city($(this));
      }
  });
  
}
BattleClass.prototype.addEnemy=function(e){
  var html = '<enemy pos="'+e.pos+'">'+
              '<span class="nam">'+e.nam+'</span>'+
              '<hp></hp>'+
           '</enemy>';
  this.enemy.append(html);
}
BattleClass.prototype.addMember=function(m){
  var html = '<member pos="'+m.pos+'">'+
              '<span class="nam">'+m.nam+'</span>'+
              '<hp></hp>'+
           '</member>';
  this.team.append(html);
}
BattleClass.prototype.removeMember=function(pos){
  this.team.find('[pos='+pos+']').remove();
}
BattleClass.prototype.init=function(data){

  this.enemy.empty();
  
  this.team.empty();
  if (!data)
    return;
  if (data.team){
    for (var i in data.team.members) {
      var member = data.team.members[i];
      this.addMember(member);
    }
  }
  if (data.enemy){
    for (var i in data.enemy.members){
      var enemy = data.enemy.members[i];
      this.addEnemy(enemy);
    }
  }
}
BattleClass.prototype.reflush=function(){

}

BattleClass.prototype.update=function(){

}