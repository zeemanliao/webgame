
/*
***********************************************************************************************
============================================寵物元件===========================================
***********************************************************************************************
*/
var PetClass = Object.Extend(BaseViewClass);

PetClass.prototype.initialize=function(){
  this.base();
}
PetClass.prototype.create=function(){
  var self = this;
  this.frame = $('#pet_frame');
 }