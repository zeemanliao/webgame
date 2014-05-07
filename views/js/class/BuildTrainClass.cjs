/*
***********************************************************************************************
============================================訓練中心===========================================
***********************************************************************************************
*/

var BuildTrainClass = Object.Extend(BaseViewClass);

BuildTrainClass.prototype.initialize=function(){
  this.button = {};
  this.base();
}
BuildTrainClass.prototype.create=function(){
  var self = this;
  this.frame.className = 'cs_buildframe';
  this.data = {
  	title:'訓練中心',
  	desc:'在此你可以調配你的能力點數'
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

BuildTrainClass.prototype.backTown=function(){
	o.city.backTown();
}

