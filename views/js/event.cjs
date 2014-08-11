
	socket.on('disconnect',function(){
		o.message.loginout = true;
		o.message.show('與伺服器斷線!請重新登入!');
	});

	socket.on('show error',function(data){
		o.message.loginout = true;
		o.message.show(data.code +':'+data.msg);
	});

	socket.on('show error2',function(data){
		o.message.loginout = true;
		debug('Error = >');
		debug(data.msg);
		o.message.show('程式出現非預期錯誤');
	});

	socket.on('message',function(data){
		o.message.show(data.msg);
	});

		//更新資料
	socket.on('update Data', function(data) {
		route(data);
	});

	socket.on('publicFunction', function(data){
		publicFunction = data;
		console.log('---------------------');
		console.log(data);
	});
