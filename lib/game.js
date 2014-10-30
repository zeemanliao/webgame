//Apple.prototype = Object.create(require('events').EventEmitter.prototype);
var CommandQueue = require('./model/command/Queue');
var loader = require('./model/Loader/Loader');
var EventEmitter = require('events').EventEmitter;
var util = require('util');
var gameEvents = [
	"login",
	"action",
	"loginout"
];
function Game() {
	EventEmitter.call(this);
	init(this);
	loadData(this);
}
util.inherits(Game, EventEmitter);

function init(game) {
	game._run = false;
	game._savers = [];
	game.queue = new CommandQueue();
}

function loadData(game) {
	console.log('=================== Game Server Data Loading ===================');

	game.components = require('./model/Loader/Components')();
	game.actions = require('./model/Loader/Actions')();
	game.data = require('./model/Loader/Data')();
	game.dataVersion = require('./model/Loader/DataVersion')();

	console.log('=================== Game Server Data Load Finish ===================');
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

Game.prototype.use = function(eventName, fun) {
	for (var i in gameEvents) {
		if (gameEvents[i] == eventName)
			this.on(eventName, fun);
	}
}

Game.prototype.join = function(err, player) {
	if (err)
		return;

	if (players[player.id])
		this.play
}
module.exports = Game;
