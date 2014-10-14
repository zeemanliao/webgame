var Player = require('./class/Player');
var tool = require('./util/tool');
var LoginKeyAccess = require('./class/db/LoginKeyAccess');
module.exports = function(io, game) {

  /*************************************************************************************
   **************************************************************************************
   ************************************私人連線*******************************************
   **************************************************************************************
   *************************************************************************************/
  io.sockets.on('connection', function(socket) {

    var player = null;
    var theSameCommandCount = 0;
    var lastCommand = null;
    var lockAction = false;

    game.components.login.loginAndJoin(socket.handshake.session.loginKeyID, function(err, _player){
      if (err) 
        return processError(err);
      
      socket.handshake.session.loginKeyID = null;
      delete socket.handshake.session.loginKeyID;
      player = _player;
      player.socket = socket;
      game.actions.login.getLocalStorageVersion(player, function(err){
          if (err)
            return processError(err);

        });
    });

    /*************************************************************************************
     **************************************************************************************
     ************************************動作程式*******************************************
     **************************************************************************************
     *************************************************************************************/
    socket.on('act', function(data) {
      try{
        if (lockAction)
          return;

        if (tool.isUndefinedOrNull(data) || 
            tool.isUndefinedOrNull(data.data) ||
            tool.isUndefinedOrNull(data.com) || 
            tool.isUndefinedOrNull(data.com2) ||
            tool.isUndefinedOrNull(game.actions[data.com]) ||
            tool.isUndefinedOrNull(game.actions[data.com][data.com2]))
          return;

        lockAction = true;
        
        game.actions[data.com][data.com2](player, data.data, function(err){
          if (err)
            processError(err);
          lockAction = false;
        });
      } catch (e) {
        processError(e);
        lockAction = false;
      }
    });

    socket.once('checkAndUpdateVersion', function(localVersion) {
      if (tool.isUndefinedOrNull(player))
        return;

      game.actions.login.checkAndUpdateVersion(player, localVersion, function(err){
        if (err)
          processError(err);

      });
    });

    socket.once('loadAllData', function() {
      if (tool.isUndefinedOrNull(player))
        return;

      game.actions.login.loadAllData(player, function(err){
        if (err)
          processError(err);

        game.actions.city.move(player, player.position, function(err){
          if (err)
            processError(err);

          player.emit({login:{ready:true}});
        });
      });
    });
    /*************************************************************************************
     **************************************************************************************
     ************************************共用程式*******************************************
     **************************************************************************************
     *************************************************************************************/

    //斷線
    socket.once('disconnect', function() {
      if (tool.isUndefinedOrNull(player))
        return;

      delete player.socket;

      player.save();
      socket.broadcast.emit("update Data",
          {guest:{remove:player.data.nam}}
        );
      console.log('....................%s Login Out', player.id);

    });

    function processError(e){
      if (e instanceof game.GameError){
        socket.emit('show error',{code:e.errCode,msg:game.lang.err(e.errCode, e.args)});
        socket.disconnect();

      } else if (e instanceof game.GameWarning) {
        
        socket.emit('message',{code:e.errCode,msg:game.lang.err(e.errCode, e.args)});
        
      } else {
        var msg = e.message + '</br>' + e.stack ? e.stack:'';
        socket.emit('show error2', {msg: msg});
        return socket.disconnect();

      }
    }
  });
};