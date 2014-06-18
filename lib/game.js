var Game = module.exports = {};
var tool = require('./util/tool');
var	charas = {},
		nickname = {},
		rooms = {},
		db = {
			mixitems:{},
			skills:{},
			areas:{},
			maps:{},
			citys:{}
		},
		ver = {
			mixitems:0,
			skills:0,
			maps:0,
			areas:0,
			citys:0
		},
		tick =0,
		coms = {},
		socket = null,
		settings = require('./settings'),
		skill = require('./obj/skill');

var fs = require('fs'),
		path = require('path');

var js_path = path.dirname(process.mainModule.filename);
/*
	共用變數區
*/

Game.charas = charas;
Game.nickname = nickname;
Game.settings = settings;
Game.rooms = rooms;		//所有玩家所在地點
Game.tick = tick;
Game.lang = lang;
Game.db = db;
Game.ver = ver;
Game.socket=socket;
Game.skill = skill;
/*
	物件區
*/
Game.coms = coms;

Game.log = function(msg,args) {
	var m=msg;
	if (typeof(args)==='string') {
		m = m.replace('$',args);
	} else if (typeof(args)==='array'){
		for (var i in args){
			var rep = args[i];
			m = m.replace('$',rep);
		}
	}
	console.log(m);
	//fs.appendFile('../self.log',util.getNow() + ' ' + msg);
}
Game.log('components load Start...............');
/*
	載入components目錄內的所有元件
*/
fs.readdirSync(__dirname + '/components').forEach(function (filename) {

  if (!/\.js$/.test(filename)) {
    return;
  }
  var name = path.basename(filename, '.js');

  var c = require('./components/' + name);
  //c.load(Game);
  c.Game = Game;
  //Game[name]=c;
  Game.coms[name]=c;
  //Game.coms[name]=require('./components/' + name);
  /*
  function load() {
    return require('./components/' + name);
  }
  Game.com.__defineGetter__(name, load);
  Game.__defineGetter__(name, load);
  */
});

Game.log('components loading End...............');

/*
	router 接收Client端傳入的資料
	data.com為元件名稱,Game.coms
	data.com2為元件中要執行的function名稱
	data.data為送入的資料內容
*/
Game.on = function(chara,data){

	//是否data.com有接收
	if (!data)
		return;
	if (!data.com)
		return;
	Game.coms[data.com].on(chara,data.com2,data.data);
}

Game.in = function(ch,data) {
	socket.in(ch).emit('update Data',data);
}

/*
	將資料傳到Client端
	chara 傳的送角色對象
	com Client的coms元件名稱
	com2 元件內的function名稱
	data 送出的資料內容
*/
Game.emit = function(chara,com,com2,data){
	var d = {};
	d[com] = {};
	d[com][com2]=data;
	chara.emit(d);
}
/*
	載入資料
*/
Game.load=function (data) {

	socket = data;
		this.log("..........Loading Start");


		//this.charas = data;
		//charas = data;
		/*載入物品
		fs.readdirSync("data/item").forEach(function(file) {
		  	
		  	put_item(require("../data/item/" + file));
		  	
		  	self.log("Item %s..........ok",file);
		});
		//載入地點
		fs.readdirSync("data/map").forEach(function(file) {

		  	put_area(require("../data/map/" + file));

		  	self.log("Area %s..........ok",file);
		});
		//載入Pet

		fs.readdirSync("data/pet").forEach(function(file) {
		  	put_data(file);
		});
*/
		
		put_data('mixitems','mixitem.json');
		put_data('skills','skill.json');
		put_data('maps','map.json');
		put_data('areas','area.json');
		put_data('citys','city.json');


		this.log("..........Loading Finish");

	};

/*
	取得目前所有登入人員
 */
Game.guest = function() {
	var reguest = [];
	for (var v in charas) {
		var g ={
			nam: charas[v].data.nam,
			cex: charas[v].data.cex,
			level: charas[v].data.level,
			photo: charas[v].data.photo
		}
		reguest.push(g);
	}
	return reguest;
}
/*
	Client登入後會先傳回Client db版本資訊
	更新Client Local Storage
*/
Game.update = function(chara,data){

	chara.redata = {chara:{update:chara.allData()},
								sys:{
									conf:settings.game,
									ver:ver,
									db:{}
								},
								guest:{
									add:this.guest()
								},
								ready:{load:1}			//登入後前端資料載入動作
							};

	for (var v in ver) {
		if (!data){						//未載入過
			chara.redata.sys.db[v]=db[v];
		}else	if (data[v] && data[v] == ver[v]){	//同一版本
//不動作1
		} else {							//不同版本

			chara.redata.sys.db[v]=db[v];
		}
	}
	chara.emit();
	chara.socket.broadcast.emit("update Data",{guest:{
			add:[{
				nam:chara.data.nam,
				cex:chara.data.cex,
				level:chara.data.level,
				photo:chara.data.photo
			}]
	}});
}

Game.join = function (chara,next){
		//放入全域角色資料中
		charas[chara.uid] = chara;
		//設定chara為game.charas.attrib內的資料
		//重新計算角色資料
		//updatechara(chara);
		//設定nickname反向查詢
		nickname[chara.data.nickname]=chara.uid;

	
		chara.socket.emit('check ver',ver);
		if (next)
			next(null);
	};
Game.leave=function(chara,next){

		if(!chara.uid) return;
		var self = this;

		chara.save(function(err){
			if (err) {
				self.log('Game.leave存檔失敗:'+err);
			}else{
				//移出隊伍
				chara.leave();
				delete nickname[chara.data.nickname];
				delete charas[chara.uid];
				chara.socket.broadcast.emit("update Data",{guest:{
			remove:chara.data.nam
	}})
				self.log(chara.uid+'.......................' +'.saved() Logout');
			}
			if (next)
				next(null);
		});
	};
Game.show_message = function(chara,msg,args){
	
	if (msg){
		var m = msg;

			if (typeof(args)==='string') {
				m = m.replace('$',args);
			} else if (typeof(args)==='array'){
				for (var i in args){
					var rep = args[i];
					m = m.replace('$',rep);
				}
			}

		chara.socket.emit('show message',{msg:m});
	}
	
};

Game.rand = function(min,max) {
	return Math.floor(Math.random()*(max-min+1)+min);
}


function put_data(dname,file){
	var data = require("../data/" + file);
	if (!data)
		return;

	var c = db[dname];
	fs.stat(js_path+'/data/'+file, function(err,stat){
			  
	  var d = new Date(stat.mtime);
	  ver[dname] = d.getTime();
		for (var i in data) {
				if (c[data[i].id]) {
					self.log('(file:$) id:$資料重複',file,data[i].id);
				}else{
					c[data[i].id]=data[i];
				}
		}
		Game.log("data $..........Load ok",file);
	});
}