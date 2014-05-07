/*
***********************************************************************************************
============================================城鎮元件===========================================
***********************************************************************************************
*/
var CityClass = Object.Extend(BaseViewClass);

CityClass.prototype.initialize=function(){
  this.builds = {};
  this.builds.city = new BuildCityClass();
  //this.builds.train = new BuildTrainClass();
  //this.builds.center = new BuildTrainClass();
  this.base();
}
CityClass.prototype.create=function(){
  var self = this;
  this.builds.city.enter();
  //this.build.city = $('cityframe');
  //this.build.city
  
  
}
