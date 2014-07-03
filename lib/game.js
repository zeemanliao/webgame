var game = module.exports = {};
var util = require('util');
var tool = require('./util/tool');
var Player = require('./class/Player');
var lang = require('./class/lang');
var	players = {},
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
		routes = {},
		socket = null,
		settings = require('./settings'),
		skill = require('./class/Skill');

var fs = require('fs'),
		path = require('path');

var js_path = path.dirname(process.mainModule.filename);
/*
	共用變數區
*/

game.players = players;
game.nickname = nickname;
game.settings = settings;
game.rooms = rooms;		//所有玩家所在地點
game.tick = tick;
game.lang = lang;
game.db = db;
game.ver = ver;
game.socket=socket;
game.skill = skill;
/*
	物件區
*/
game.routes = routes;

game.log = function(msg,args) {
	var _msg=msg;
	if (typeof(args)==='string') {
		_msg = _msg.replace('$',args);
	} else if (typeof(args)==='array'){
		for (var i in args){
			var rep = args[i];
			_msg = _msg.replace('$',rep);
		}
	}
	console.log(_msg);
}
game.log('routes load Start...............');
/*
	載入routes目錄內的所有元件
*/
fs.readdirSync(__dirname + '/routes').forEach(function (filename) {

  if (!/\.js$/.test(filename)) {
    return;
  }
  var name = path.basename(filename, '.js');

  var _routes = require('./routes/' + name);

  _routes.game = game;

  game.routes[name]=_routes;
});

game.log('routes loading End...............');


game.in = function(ch,data) {
	socket.in(ch).emit('update Data',data);
}

/*
	載入資料
*/
game.load = function (data) {

	socket = data;
		this.log("..........Loading Start");
		
		putData('mixitems','mixitem.json');
		putData('skills','skill.json');
		putData('maps','map.json');
		putData('areas','area.json');
		putData('citys','city.json');


		this.log("..........Loading Finish");

	};

/*
	取得目前所有登入人員
 */
game.guest = function() {
	var reguest = [];
	for (var v in players) {
		var g ={
			nam: players[v].data.nam,
			cex: players[v].data.cex,
			level: players[v].data.level,
			photo: players[v].data.photo
		}
		reguest.push(g);
	}
	return reguest;
}
/*
	Client登入後會先傳回Client db版本資訊
	更新Client Local Storage
*/
game.updateLocalStorage = function(player,data){

	var _redata = {player:{update:player.allData()},
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
			_redata.sys.db[v]=db[v];
		}else	if (data[v] && data[v] == ver[v]){	//同一版本
//不動作1
		} else {							//不同版本
			_redata.sys.db[v]=db[v];
		}
	}
	player.emit(_redata);
	player.socket.broadcast.emit("update Data",{guest:{
			add:[{
				nam:player.data.nam,
				cex:player.data.cex,
				level:player.data.level,
				photo:player.data.photo
			}]
	}});
}
game.login = function(playerID) {

}
game.join = function (player, next){
		//放入全域角色資料中
		players[player.id] = player;
		//設定player為game.players.attrib內的資料
		//重新計算角色資料
		//updateplayer(player);
		//設定nickname反向查詢
		nickname[player.data.nam]=player.id;

	
		player.socket.emit('check ver',ver);
		if (next)
			next(null);
	};
game.leave=function(player, next){
		if (tool.isUndefinedOrNull(player) || 
				tool.isUndefinedOrNull(player.id))
			return;

		var self = this;

		player.save(function(err){
			if (err) {
				self.log('game.leave存檔失敗:'+err);
			}else{
				//移出隊伍
				player.leave();
				delete nickname[player.data.nickname];
				delete players[player.id];
				player.socket.broadcast.emit("update Data",{guest:{
			remove:player.data.nam
	}})
				self.log(player.id+'.......................' +'.saved() Logout');
			}
			if (next)
				next(null);
		});
	};

game.checkLogin = function(player) {
    var playerID = socket.handshake.session.playerID;

    if (!playerID)
        return show_error(game.lang.err('E0008'));

    if (playerID in game.players) 
        return show_error(game.lang.err('E0007'));

    login(playerID);
};

//登入

function login(playerID) {

    //還沒登入過就到db抓player資料放入game.players
    Player.getByID(
      playerID,
      function(err, _player) {
        if (err)
           return show_error(err);

        if (_player) {
            _player.socket = socket;
            player = _player;

            //設定guild index
            //guild[player.guild]
            //角色移到房間中
            game.join(player);

        } else {
        		//找不到角色資料
            show_error(lang.err('E0009'));
        }
    });
};

//登出

game.show_error = function(msg, sock) {
    if (!sock) {
        sock = socket;
    } else {
        sock = sock.socket;
    }

    //sock.handshake.session.destroy();
    sock.emit('show error', {
        msg: msg
    });
    sock.disconnect();
    /*
	promise 同步操作,目前測試正常
	但還不確定進disconnect後的所有作業完成才會執行
	觀察中
*/
    if (typeof promise != 'undefined')
        promise.resolve();
};

function putData(dname,file){
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
		game.log("data $..........Load ok",file);
	});
}

