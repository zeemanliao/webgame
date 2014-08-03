/*
***********************************************************************************************
==============================LocalStorageClass用戶端資料元件==================================
***********************************************************************************************
*/
var LocalStorageClass = Class.create();
LocalStorageClass.prototype = {

  initialize: function() {
  	    
    this.version=localStorage.version ? JSON.parse(localStorage.version) : {};
    this.skills=localStorage.skills ? JSON.parse(localStorage.skills) : {};
    this.items=localStorage.items ? JSON.parse(localStorage.items) : {};
    this.mixitems=localStorage.mixitems ? JSON.parse(localStorage.mixitems) : {};
    this.maps=localStorage.maps ? JSON.parse(localStorage.maps) : {};
    this.areas=localStorage.areas ? JSON.parse(localStorage.areas) : {};
    this.builds=localStorage.builds ? JSON.parse(localStorage.builds) : {};
 //   this.setup=localStorage.setup ? JSON.parse(localStorage.setup) : setup;
    //Extend(setup,this.setup);

  },
  
  put:function(d, data) {
    localStorage[d] = JSON.stringify(data)
  	this[d] = data;
  }
}