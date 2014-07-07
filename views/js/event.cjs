
	socket.on('disconnect',function(){
		o.message.show('與伺服器斷線!請重新登入!',true);
	});

	socket.on('show error',function(data){
		o.message.show(data.msg,false);
	});

	socket.on('show error2',function(data){
		debug('Error = >');
		debug(data.msg);
		o.message.show('程式出現非預期錯誤',false);
	});

	socket.on('show message',function(data){
		o.message.show(data.msg,false);
	});

		//更新資料
	socket.on('update Data', function(data) {
		route(data);
	});

  socket.on('check ver', function(data){
    socket.emit('check ver',db.ver);
  });
