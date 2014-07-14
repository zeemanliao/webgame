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

    game.components.login.loginAndJoin(socket.handshake.session.loginKeyID, function(err, _player){
      if (err) 
        return processError(err);
      
      player = _player;
      player.socket = socket;
      game.routes.login.getLocalStorageVersion(player, function(err){
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
        if (tool.isUndefinedOrNull(data) || 
            tool.isUndefinedOrNull(data.data) ||
            tool.isUndefinedOrNull(data.com) || 
            tool.isUndefinedOrNull(data.com2) ||
            tool.isUndefinedOrNull(game.routes[data.com]) ||
            tool.isUndefinedOrNull(game.routes[data.com][data.com2]))
          return;

        if (data == lastCommand){
          theSameCommandCount += 1;
        } else {
          theSameCommandCount = 0;
        }

        if (theSameCommandCount>1)
          return console.log('Stop Command');
        
        game.routes[data.com][data.com2](player, data.data, function(err){
          if (err)
            processError(err);

        });
      } catch (e) {
        processError(e);
      }
    });

    socket.once('checkAndUpdateVersion', function(localVersion) {
      if (tool.isUndefinedOrNull(player))
        return;

      game.routes.login.checkAndUpdateVersion(player, localVersion, function(err){
        if (err)
          processError(err);

      });
    });

    socket.once('loadAllData', function() {
      if (tool.isUndefinedOrNull(player))
        return;

      game.routes.login.loadAllData(player, function(err){
        if (err)
          processError(err);

        game.routes.city.move(player, player.position, function(err){
          if (err)
            processError(err);
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

      socket.broadcast.emit("update Data",
          {guest:{remove:player.data.nam}}
        );
      console.log('....................%s Login Out', player.id);

    });

    function processError(e){
      if (e instanceof game.GameError){
        socket.emit('show error',{code:e.errCode,msg:game.lang.err(e.errCode)});
        socket.disconnect();

      } else if (e instanceof game.GameWarning) {
        socket.emit('message',{code:e.errCode,msg:game.lang.err(e.errCode)});
        
      } else {
        var msg = e.message + '</br>' + e.stack ? e.stack:'';
        socket.emit('show error2', {msg: msg});
        return socket.disconnect();

      }
    }
  });
};