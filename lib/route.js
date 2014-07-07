var Player = require('./class/Player');

module.exports = function(io, game) {
  /*************************************************************************************
   **************************************************************************************
   ************************************私人連線*******************************************
   **************************************************************************************
   *************************************************************************************/
  io.sockets.on('connection', function(socket) {
    var player = null;
    game.components.login.loginAndJoin(socket.handshake.session.playerID, function(err, _player){
      if (err) {
        return processError(err);
        socket.disconnect();
      }
      
      player = _player;
      player.socket = socket;
      player.socket.emit('check ver',ver);
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

        game.routes[data.com][data.com2](player, data.data, function(err){
          if (err)
            processError(err);

          if (!tool.isUndefinedOrNull(player.returnData)){

          }
        });
      } catch (e) {
        processError(e);
      }
    });

    socket.on('check ver', function(data) {
      try{
        game.updateLocalStorage(player, data);
      } catch (e) {
        var msg = e.message + '</br>' + e.stack ? e.stack:'';
        processError(new game.GameError(msg));
      }
        
    });
    /*************************************************************************************
     **************************************************************************************
     ************************************共用程式*******************************************
     **************************************************************************************
     *************************************************************************************/

    //斷線
    socket.on('disconnect', function() {
      if (tool.isUndefinedOrNull(player))
        return processError(new game.GameError(''));

      var playerID = socket.handshake.session.playerID;
      
      delete player.route;

      socket.broadcast.emit("update Data",
          {guest:{remove:player.data.nam}}
        );
      console.log('....................%s Login Out', playerID);

    });

    function processError(e){
      console.log('test');
      if (e instanceof game.GameError){
        socket.emit('show error', {msg: e.message});

      } else if (e instanceof game.GameWarning) {
        socket.emit('message',lang.err(e.errCode));
        
      } else {
        var msg = e.message + '</br>' + e.stack ? e.stack:'';
        socket.emit('show error2', {msg: msg});
      }
    }
  });
};