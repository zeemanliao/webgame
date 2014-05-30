
/*
***********************************************************************************************
============================================線上玩家顯示元件===========================================
***********************************************************************************************
*/
var GuestClass = Object.Extend(BaseViewClass);

GuestClass.prototype.initialize=function(){
  this.base();
  this.data = {};
}

GuestClass.prototype.create=function(){
  var self = this;
  this.frame = $('#guest_frame');
  this.content = $('.guest_content','#guest_frame');
 }

 GuestClass.prototype.add=function(data){
  for (var i in data){
  	var guest = data[i];
  	this.data[guest.nam] = guest
    this.content.append('<div class="guest" id="guest_list_'+guest.nam+'">'+
                    '<img class="photo" alt="Photo" src="'+guest.photo+'">'+
                    '<div class="nam">'+guest.nam+'</div>'+
                    '<div class="level">Lv.'+guest.level+'</div>'+
                    '<div class="cex">Cex:'+guest.cex+'</div>'+
                '</div>');
  }
 }

 GuestClass.prototype.remove = function(nam) {
  if (nam.length >0 ) {
    $('#guest_list_'+nam).remove();
  } else {
    debug('guest remove('+data+')無移除元件');
  }
 }