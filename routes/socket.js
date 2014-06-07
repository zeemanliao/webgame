var User = require('../lib/obj/user'),
    Promise = require("node-promise").Promise;

module.exports = function(io) {
    var game = require('../lib/game');
    game.load(io.sockets);
    //act.load(game);
    //chat.load(game);

    //每n秒動作
    setInterval(function() {
        //game.charas.forEach(update);
        //game.ticker.run();
    }, 1000);

    //this.__defineGetter__('chat',require('../lib/obj/chat'));
    //console.log(chat('123'));
    /*************************************************************************************
     **************************************************************************************
     ************************************私人連線*******************************************
     **************************************************************************************
     *************************************************************************************/
    io.sockets.on('connection', function(socket) {
        var chara = null;
        checklogin(socket);


        /*************************************************************************************
         **************************************************************************************
         ************************************動作程式*******************************************
         **************************************************************************************
         *************************************************************************************/
        socket.on('act', function(data) {
            try{
                game.on(chara, data);
            } catch (e) {
                var msg = e.message + '</br>' + e.stack ? e.stack:'';
                socket.emit('show error',msg);
            }
        });
        socket.on('check ver', function(data) {
            try{
                game.update(chara, data);
            } catch (e) {
                var msg = e.message + '</br>' + e.stack ? e.stack:'';
                socket.emit('show error',msg);
            }
            
        });
        /*************************************************************************************
         **************************************************************************************
         ************************************共用程式*******************************************
         **************************************************************************************
         *************************************************************************************/



        function checklogin(socket) {

            var uid = socket.handshake.session.uid;
            if (!uid){
                //UID傳入錯誤
                show_error(lang.err.E0008);
            }

            var promise = new Promise();
            if (uid in game.charas) {
                //如果已登入過就清掉session
                show_error(lang.err.E0007, game.charas[uid]);
                promise.then(login(uid));
                console.log('.......................MultiLogin ' + uid);
            } else {
                login(uid);
            }
        };

        //登入

        function login(uid) {

            //還沒登入過就到db抓chara資料放入game.charas
            User.get({
                uid: uid
            }, function(error, data) {
                if (error)
                    show_error(error);

                if (data) {
                    data.socket = socket;
                    chara = data;

                    //設定guild index
                    //guild[chara.guild]
                    //角色移到房間中
                    game.join(chara);

                } else {
                		//找不到角色資料
                    show_error(lang.err.E0009);
                }
            });
        };

        //登出

        function show_error(msg, sock) {
            if (!sock) {
                sock = socket;
            } else {
                sock = sock.socket;
            }

            //sock.handshake.session.destroy();
            sock.emit('show error', {
                msg: msg
            });
            sock.disconnect();
            /*
				promise 同步操作,目前測試正常
				但還不確定進disconnect後的所有作業完成才會執行
				觀察中
			*/
            if (typeof promise != 'undefined')
                promise.resolve();
        };

        //斷線
        socket.on('disconnect', function() {
            //離開
            var uid = socket.handshake.session.uid;
            
            game.leave(chara, function(err) {
                if (!err)
                    console.log('....................%s Login Out',uid);
            });
        });
    });
};
/********************************************************************************
 ******               *********  ************     **********  *******  ***********
 ************  ****************************  *****  ********  ******  ************
 ************  ****************  *********  ****************  *****  *************
 ************  ****************  *********  ****************  ****  **************
 ************  ****************  *********  ****************       ***************
 ************  ****************  *********  ****************  ***   **************
 ************  ****************  **********  *****  ********  *****   ************
 ************  ****************  ************     **********  ******   ***********
 ********************************************************************************/
