/*
***********************************************************************************************
===========================================主視窗元件==========================================
***********************************************************************************************
*/
var ContentFrameClass = Object.Extend(BaseViewClass);

ContentFrameClass.prototype.initialize=function(){
  this.base();
}
ContentFrameClass.prototype.create=function(){
	this.frame.className='cs_contentframe';
	document.body.appendChild(this.frame);
}
ContentFrameClass.prototype.hideAll=function(){
	var fc = this.frame.firstChild;
	while (fc){
		hideframe.appendChild(fc);
		fc = this.frame.firstChild;
	}
}