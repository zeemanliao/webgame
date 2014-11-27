var tool = require('../lib/util');
var appInfo = tool.require('package.json');
var loginer = tool.require('lib/Loginer');
var lang = tool.require('lib/Lang');
module.exports = function(io, game) {

  /*************************************************************************************
   **************************************************************************************
   ************************************私人連線*******************************************
   **************************************************************************************
   *************************************************************************************/
  io.sockets.on('connection', function(client) {

    var player = null;

    /*************************************************************************************
     **************************************************************************************
     ************************************動作程式*******************************************
     **************************************************************************************
     *************************************************************************************/
    client.on('act',game.actionRoute);

    client.on('chat',game.chatRoute);

    client.once('login', function(loginKey){

      var ip = client.handshake.address;
      var verify = loginer.verifyLoginKey({
                    loginKey: loginKey,
                    clientIP: ip
                  });

      if (!verify)
        return client.emit('message',{type:'error',msg:"登入失敗!"});

      loginer.login(loginKey, function(err, _player){
        if (err)
          return client.emit('message',{type:'error',msg:"登入失敗!"});
        
        player = _player;
        player.client = client;
        
        game.join(player);
      });
    });


    /*************************************************************************************
     **************************************************************************************
     ************************************共用程式*******************************************
     **************************************************************************************
     *************************************************************************************/

    //斷線
    client.once('disconnect', function() {
      if (tool.isUndefinedOrNull(player))
        return;

      delete player.client;

      //player.save();
      client.broadcast.emit("update Data",
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
        game.error(client, e);
      }
      return callback?callback:null;
    }

  });
};