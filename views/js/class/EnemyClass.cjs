
/*
***********************************************************************************************
============================================敵人元件===========================================
***********************************************************************************************
*/
var EnemyClass = Object.Extend(BaseViewClass);

EnemyClass.prototype.initialize=function(args){
  this.base(args);
}
EnemyClass.prototype.add=function(args){
  var self = this;
  this.data = args;
  debug(this.data);
}
