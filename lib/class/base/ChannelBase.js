var tool = require('../util/tool');
var SocketClient = require('./SocketClient');
function ChannelBase(sendToClient) {

}

ChannelBase.prototype.setSocketChannel = funciton(socket){
	this.sendToClient = sendToClient(socket);
}

module.exports = ChannelBase;
