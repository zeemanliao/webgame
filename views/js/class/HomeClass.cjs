
/*
***********************************************************************************************
============================================自宅元件===========================================
***********************************************************************************************
*/
var HomeClass = Object.Extend(BaseViewClass);

HomeClass.prototype.initialize=function(){
  this.base();
}

HomeClass.prototype.create=function(){
  var self = this;
  this.frame = $('#home_frame');
  this.content = this.frame.find('.city_content');
  this.nam = this.gid('nam');
  this.desc = this.gid('desc');
  live('.selectType',{
    click:function (event) {
      alert($(this).attr('data'));
    }
  });
}

HomeClass.prototype.reflush=function(){
  this.update();
}

HomeClass.prototype.update=function(){
	
}