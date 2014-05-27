
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
        event.preventDefault();
        
        $(this).delay(0).animate(
          {
            width: $(this).width()+10,
            height: $(this).height()+10,
            top: $(this).position().top-5,
            left: $(this).position().left-5
          }
          ,50
          );
       $(this).delay(0).animate(
           {
              width: $(this).width(),
              height: $(this).height(),
              top: $(this).position().top,
              left: $(this).position().left
            },
           50,
           null,
           function(){
             self.city($(this));
           }
         );
      }
  });
}

BattleClass.prototype.reflush=function(){
  this.update();
}

BattleClass.prototype.update=function(){
	if (this.ver != db.ver.battles) {
		this.ver = db.ver.battles;
		this.content.empty();
		for (var i in db.battles){
			var battle = db.battles[i];
    this.content.append('<div data="map" battle="' + battle.id + '" ' +
      'enable="'+(o.chara.data.level>=battle.level)+'" class="battle_button" gid="battle-'+
        battle.position.x+
        '-'+battle.position.y+
        '">' + battle.nam 
        +'</div>');
		}
	}
}