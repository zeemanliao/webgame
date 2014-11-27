var Error = require('./ErrorFactory');

module.exports = function(player, error){
  if (error instanceof Error.GameError){
    this.send('message', player, {type:'error',msg:game.lang.err(error.errCode, error.args)});

  } else if (error instanceof Error.GameWarning) {
    
    this.send('message', player, {type:'warning',msg:game.lang.err(error.errCode, error.args)});
    
  } else {
    var msg = error.message + '</br>' + error.stack ? error.stack:'';
    this.send('message', player, {type:'error',msg: msg});
  }
}