var Player = require('./class/Player');

module.exports = function(io, game) {
  /*************************************************************************************
   **************************************************************************************
   ************************************私人連線*******************************************
   **************************************************************************************
   *************************************************************************************/
  io.sockets.on('connection', function(socket) {
    var player = null;
    game.loginAndJoin(socket.handshake.session.playerID, function(err, _player){
      if (err) {
        return showError(err);
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
            tool.isUndefinedOrNull(data.com2)) ||
            tool.isUndefinedOrNull(game.routes[data.com]) ||
            tool.isUndefinedOrNull(game.routes[data.com][data.com2])
          return;

        game.routes[data.com][data.com2](player, data.data, function(err){
          if (err)
            processError(err);
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
        showError(msg);
      }
        
    });
    /*************************************************************************************
     **************************************************************************************
     ************************************共用程式*******************************************
     **************************************************************************************
     *************************************************************************************/

    //斷線
    socket.on('disconnect', function() {
      //離開
      var playerID = socket.handshake.session.playerID;
      
      delete player.route;

      socket.broadcast.emit("update Data",
          {guest:{remove:player.data.nam}}
        );
      console.log('....................%s Login Out', playerID);

    });

    function processError(e){
      if (e instanceof game.GameError){
        showError(lang.err[e.errCode])
      } else if (e instanceof game.GameWarning) {
        player.socket.emit('message',lang.err(e.errCode));
      } else {
        var msg = e.message + '</br>' + e.stack ? e.stack:'';
        showError(msg);
      }
    }

    function showError(msg) {
        socket.emit('show error', {msg: msg});
    };
  });
};