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
    var f = o[obj.attr('data')];
    if ($('#city').is(':hidden')) {
      $('#battle').hide();
      $('#city').show();
    }
    if (f) {
      $('.content_frame').hide();
      f.show();
    } else {
      debug('Object:'+f.attr("data")+'->can not find');
    }
  },
  battle:function(obj) {
    var f = o[obj.attr('data')];
    if ($('#battle').is(':hidden')) {
      $('#battle').show();
      $('#city').hide();
    }
    debug(obj);
  }
}

var BaseCityClass = Object.Extend(BaseViewClass);
BaseCityClass.prototype.enter = function(){
  cframe.append(this.frame);
}

