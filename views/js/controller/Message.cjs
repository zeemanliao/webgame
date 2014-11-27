function Message(evt, type, msg) {
	switch (type) {
		case "error":
			zGame.frame('error').vis = true;
			break;
		case "warning":
			zGame.frame('message').vis = true;
			//alert('warning:'+msg);
			break;
		case "message":
			zGame.frame('message').vis = true;
			//alert('message:'+msg);
			break;
	}
}