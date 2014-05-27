/*
***********************************************************************************************
==============================LocalStorageClass用戶端資料元件==================================
***********************************************************************************************
*/
var LocalStorageClass = Class.create();
LocalStorageClass.prototype = {

  initialize: function() {
  	    
    this.ver=localStorage.ver ? JSON.parse(localStorage.ver) : null;
    this.skills=localStorage.skills ? JSON.parse(localStorage.skills) : null;
    this.items=localStorage.items ? JSON.parse(localStorage.items) : null;
    this.mixitems=localStorage.mixitems ? JSON.parse(localStorage.mixitems) : null;
    this.maps=localStorage.maps ? JSON.parse(localStorage.maps) : null;
    this.areas=localStorage.areas ? JSON.parse(localStorage.areas) : null;
    this.citys=localStorage.citys ? JSON.parse(localStorage.citys) : null;
 //   this.setup=localStorage.setup ? JSON.parse(localStorage.setup) : setup;
    //Extend(setup,this.setup);

  },
  put:function(d,data) {
    localStorage[d] = JSON.stringify(data)
  	this[d] = data;
  }
}