/*
***********************************************************************************************
===========================================城鎮中心============================================
***********************************************************************************************
*/

var BuildCityClass = Object.Extend(BaseCityClass);

BuildCityClass.prototype.initialize=function(){
  this.button = {};
  this.base();
}
BuildCityClass.prototype.create=function(){
  var self = this;
  this.frame = $('city_frame');
}


