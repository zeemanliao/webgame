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

    if (socket.handshake.session) {
      game.components.login.loginAndJoin(socket.handshake.session.loginKeyID, function(err, _player){
        if (err) 
          return processError(err);
        
        socket.handshake.session.loginKeyID = null;
        delete socket.handshake.session.loginKeyID;
        player = _player;
        player.socket = socket;
        actionRoute({com:"login",com2:"getLocalStorageVersion",data:"N"});
      });
    }
    /*************************************************************************************
     **************************************************************************************
     ************************************動作程式*******************************************
     **************************************************************************************
     *************************************************************************************/
    socket.on('act',actionRoute);

    socket.once('checkAndUpdateVersion', function(localVersion) {
      if (tool.isUndefinedOrNull(player))
        return;

      actionRoute({com:"login",com2:"checkAndUpdateVersion",data:localVersion});

    });

    socket.once('loadAllData', function() {
      if (tool.isUndefinedOrNull(player))
        return;


      game.actions.login.loadAllData(player, "N", function(err){
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

   function actionRoute(data, callback) {
      try{
        if (tool.isUndefinedOrNull(data) || 
            tool.isUndefinedOrNull(data.data) ||
            tool.isUndefinedOrNull(data.com) || 
            tool.isUndefinedOrNull(data.com2) ||
            tool.isUndefinedOrNull(game.actions[data.com]) ||
            tool.isUndefinedOrNull(game.actions[data.com][data.com2]))
          return;

        game.actions[data.com][data.com2](player, data.data, function(err){

          if (err)
            processError(err);
          
          return callback?callback:null;
        });
      } catch (e) {
        processError(e);
      }
      return callback?callback:null;
    }
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