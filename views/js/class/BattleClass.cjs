
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
  this.enemys = this.content.find('#enemys');
  this.team = this.content.find('#team');
  
  live('.battle_button',{
    click:function (event) {
      self.city($(this));
      }
  });
  
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
BattleClass.prototype.reset=function(data){

  this.enemys.empty();
  
  this.team.empty();
  if (data){
    if (data.members)
      this.data.members = data.members;
    if (data.team)
    this.data.team = data.team;
  }
  for (var i in this.data.members) {
    var member = this.data.members[i];
    this.addMember(member);
  }
}
BattleClass.prototype.reflush=function(){

}

BattleClass.prototype.update=function(){

}