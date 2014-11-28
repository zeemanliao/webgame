var path = require('path');
var basePath = path.dirname(process.mainModule.filename);
var tool = require('../lib/util');
var Loader = tool.require('./lib/data/loader/RequireLoader');
var EventEmitter = require('events').EventEmitter;
var util = require('util');
var fs = require('fs');

function Game(config) {
	var _self = this;
	EventEmitter.call(this);
	this.config = config;
	init(this);
	this.channel = 
	{
		'chat':function(client, data){
			if (this._run) {
				_self.emit.call(_self, 'chat', [data.type ,data.msg]);
			}
		},
		'action':function(client, data) {
			if (this._run) {

			}
		}
	}
}
util.inherits(Game, EventEmitter);

function init(game) {
	game.players = {};
	game._run = false;
	game.data = {};

	/*
		Load Component
	*/
	var loaderList = game.config.loader;

	for (var i in loaderList) {
		game[i] = requireFolder(path.join(__dirname, loaderList[i]));

		for (var j in game[i]) {
			console.log('Load Components\t%s\t->\t%s', i, j)
		}
	}

	/*
		Load Data
	*/
	var loaderList = game.config.data;

	for (var i in loaderList) {
		game.data[i] = {};
		var _path = path.join(basePath, 'data', loaderList[i] + '.json');
		loadData(game.data[i], _path);

		console.log('Load Data\t%s\t->\t%s[%s]', i, loaderList[i], Object.keys(game.data[i]).length);
	}
}

Game.prototype.setRoute = function(client) {
	var _self = this;
	for (var i in this.channel) {
		var _channel = this.channel[i];
		client.on(i, function(data){
			_channel(data);
		});
	}
}

Game.prototype.start = function() {
	console.log('Game Server Start');
	this._run = true;
}

Game.prototype.stop = function() {
	console.log('Game Server Stop');
	this._run = false;
}

Game.prototype.save = function() {
}

Game.prototype.set = function(name, fun) {
	if (!this[name]) {
		this[name] = fun;
	} else {
		console.log('Game.%s Alive',name);
	}
}

Game.prototype.use = function(channelName, fun) {
	for (var _channelName in this.channel) {
		if (_channelName == channelName){
			this.on(channelName, fun);
		}
	}
}

Game.prototype.join = function(player) {
	if (_self._run) {
		if (!_self.players[player.id])
			_self.players[player.id] = player;
		_self.emit.call(_self, 'join', player);
	}
}

Game.prototype.send = function(channel, client, data){
	client.emit(channel, data);
	this.emit.call(this, 'send', channel, data);
}

Game.prototype.error = function(client, exception){
	if (this._run) {
		this.emit.call(this, 'error', this, client, exception);
	}
}
module.exports = Game;

function requireFolder(_path) {
	var _return = {};
	var patt = new RegExp(".js");
	fs.readdirSync(_path).forEach(function (filename) {

	  if (!patt.test(filename)) {
	    return;
	  }

	  var _name = path.basename(filename, '.js');

	  var _req = require(path.join(_path, filename));

	  _return[_name] = _req;
	  
	});
	
	return _return;
}

function loadData(refData, _path) {
	var _data = require(_path);

	for (var i in _data) {
			if (refData[_data[i].id]) {
				console.log('(file:%s) id:%s資料重複', dataFileName, data[i].id);
			}else{
				refData[_data[i].id]=_data[i];
			}
	}
	//if (isNaN(GameData.version[dataName]))
	//	GameData.version[dataName] = 0;
	//GameData.version[dataName] += fs.statSync(data_path + dataFileName + '.json').mtime.getTime()
}