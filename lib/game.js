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
	/*
	game.components = loaderFunction('components');
	game.actions = loaderFunction('actions');
	game.data = require('./model/Loader/Data');
	*/
}

function loadData(game) {
	game.components = require('./model/Loader/Components')();
	game.actions = require('./model/Loader/Actions')();
	game.data = require('./model/Loader/Data')();
}

Game.prototype.start = function() {
	console.log('Game Server Start');
	this._run = true;
}

Game.prototype.stop = function() {
	console.log('Game Server Stop');
	this._run = true;
}

Game.prototype.save = function() {

}

module.exports = Game;
