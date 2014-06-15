/*
***********************************************************************************************
======================================BaseViewClass基本元件====================================
***********************************************************************************************
*/
var BaseViewClass = function(){};//Class.create();
BaseViewClass.prototype = {
  base: function(args) {
    this.data=null;
    this.objs={};

    if (typeof(this.create)=='function'){
      this.create(args);
    } else {
      this.frame = null;
    }

  },
  gid:function(gid_name){
    //return $("[gid='"+gid_name+"']",this.frame.id);
    return this.frame.find("[gid='"+gid_name+"']");
  },
  hide:function() {
    var self = this;
    this.frame.delay(0).animate(
      {opacity:'0'},
      50,
      null,
      function(){
        self.frame.hide();
      }
    );
  },
  show:function() {
    var self = this;
    this.frame.delay(0).animate(
      {opacity:'1'},
      50,
      null,
      function(){
        self.frame.show();
    });
  },
  city:function(obj) {
    var f;
    var cmd;
    if (typeof(obj) == 'string')
      cmd = obj;
    else
      cmd = obj.attr('data');

    
    coms.city.emit('move',cmd);

  }
}
