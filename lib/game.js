//Apple.prototype = Object.create(require('events').EventEmitter.prototype);
var CommandQueue = require('./model/command/Queue');
var loader = require('./model/Loader/Loader');
function Game() {
	init(this);
	loadData(this);
}

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

module.exports = Game;
