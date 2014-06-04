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

	//傳入參考不正確
	if (!util.check(data))
		return Game.show_message(chara,lang.err.E0013);

	var buld = Game.db.citys[data] ;
	//找不到此區可進入
	if (!util.check(buld))
		return Game.show_message(chara,lang.err.E0016,data);

	//移出隊伍
	if (chara.tmp.team)
		chara.tmp.team.out(chara);
	chara.tmp.battle = 0;
	chara.tmp.city = data;
};

