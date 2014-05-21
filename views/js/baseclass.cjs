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
      this.create();
    } else {
      this.frame = null;
    }

  },
  gid:function(gid_name){
    return $("[gid='"+gid_name+"']",this.frame.id);
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
      }
    );
  },
  goto:function(goto_frame) {
    if (o[goto_frame]) {
      $('.content_frame').hide();
      o[goto_frame].show();
    } else {
      debug('Object:'+goto_frame+'->can not find');
    }
  }
}

var BaseCityClass = Object.Extend(BaseViewClass);
BaseCityClass.prototype.enter = function(){
  cframe.append(this.frame);
}

