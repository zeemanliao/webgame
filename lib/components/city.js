var util = require('../util/tool.js');
var coms = {};
var self = this;
this.on = function(chara,com2,data){
	if (!com2)
	return;

	if (!coms[com2])
		return;
	
	coms[com2](chara,data);
}

coms.move = function(chara,data) {
	self.move(chara,data);
}
/*
	地圖移動
*/
this.move = function(chara,data){

	//傳入參考不正確
	if (!util.check(data))
		return self.Game.show_message(chara,lang.err.E0013);

	var buld = self.Game.db.citys[data] ;
	//找不到此區可進入
	if (!util.check(buld))
		return self.Game.show_message(chara,lang.err.E0016,data);

	chara.move(data);
	
};

