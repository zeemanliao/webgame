var Game = require('../lib/game');
var should = require('should');
var mockBase = process.cwd() + '/test';
var gameSettings = require('../lib/settings');
describe('game', function() {
    describe('#createGame', function() {
        it('should create and get Game', function(done) {
            var game = new Game(gameSettings);
            should.exist(game);
            done();
        });
    });
});
