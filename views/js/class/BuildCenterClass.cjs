/*
***********************************************************************************************
===========================================冒險者中心==========================================
***********************************************************************************************
*/

var BuildCenterClass = Object.Extend(BaseViewClass);

BuildCenterClass.prototype.initialize=function(){
  this.button = {};
  this.base();
}
BuildCenterClass.prototype.create=function(){
  var self = this;
  this.frame.className = 'cs_buildframe';
  this.data = {
  	title:'冒險者中心',
  	desc:'在此有許多的冒險任務等著你來挑戰'
  };

  this.title = this.createObj();
  put(this.title,this.data.title);

  this.desc = this.createObj();
  put(this.desc,this.data.desc);

  var backTownbtn = this.createObj();
  backTownbtn.className="cs_btn_city";
  backTownbtn.innerHTML='回到城鎮';
  addEventHandler(backTownbtn,"click",BindAsEventListener(this,this.backTown));

  this.append(this.title);
  this.append(this.desc);
  this.append(backTownbtn);
  //hideframe.append(this.frame);
  
}

BuildCenterClass.prototype.backTown=function(){
	o.city.backTown();
}


