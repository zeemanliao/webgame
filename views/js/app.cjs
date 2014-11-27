var game = new Game('Hero2');
var socket = io.connect('http://<%=host%>')

var cityFrame = ["guest","quest","active","pet","mix","area","map","chara","shop","team","home"];
var messageFrame = ["message","loading","error"];
game.setRoute(socket);

game.use('load', Loader);

game.use('message', Message);

for (var i in messageFrame) {
	zGame.frame(messageFrame[i]).group = 'message';
}
for (var i in cityFrame) {
	zGame.frame(cityFrame[i]).group = 'city';
}

//socket.on('message', function(data){game.message(data);});


