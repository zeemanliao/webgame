var Error = require('./ErrorFactory');

module.exports = function(game, player, error){
  if (error instanceof Error.GameError){
    game.send('message', player, {type:'error',msg:game.lang.err(error.errCode, error.args)});

  } else if (error instanceof Error.GameWarning) {
    
    game.send('message', player, {type:'warning',msg:game.lang.err(error.errCode, error.args)});
    
  } else {
    var msg = error.message + '</br>' + error.stack ? error.stack:'';
    game.send('message', player, {type:'error',msg: msg});
  }
}