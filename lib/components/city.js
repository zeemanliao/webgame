var util = require('../util/tool.js');
var Game = {};
var coms = {};

this.load = function(data) {
	Game = data;
}
/*
	router 接收傳入的資料,分派到特定的function去執行
*/
this.on = function(chara,com2,data){
	if (!com2)
	return;

	if (!coms[com2])
		return;
	
	coms[com2](chara,data);
}

/*
	地圖移動
*/
coms.enter = function(chara,data){
	
	if (!util.check(data))
		return;

	var buld = Game.db.citys[data] ;
	if (!util.check(buld))
		return;

	//Game.log('build'+buld);
	//var now_map = Game.db.maps[data];
	//chara.data.map = data;
	//Game.emit(chara);
};

