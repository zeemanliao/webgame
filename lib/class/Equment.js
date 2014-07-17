
var EqumentAccess = require('./db/EqumentAccess');
var tool = require('../util/tool');
var Game = require('../game');
var Battle = require('./battle')
var settings = Game.settings;

function Equment() {
  this.id = 0;
  this._pwd = '';
  this.members = {};
  this.limit = 0;	//members上限

}

module.exports = Team;

Equment.create = function (data, callback) {
}