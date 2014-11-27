if(!Modernizr.localstorage){
    alert('您的瀏覽器為舊版本！不支援Loacl Storage！');
    location.href='/';
}
var crlf = '<br/>',
    redirect_index = false,
    SHOWDATE = new Date(<%=new Date().getTime()%>);
    
var Class = {
  create: function() {
    return function() {
        this.initialize.apply(this, arguments);
    }
  }
}

var userAgent = window.navigator.userAgent;
var isIE = userAgent.indexOf("MSIE") > 0;

window.location.hash = ''; // for older browsers, leaves a # behind

history.pushState('', document.title, window.location.pathname); // nice and clean

try {
    e.defaultPrevented(); // no page reload
} catch (e) {
}

var isIE = (document.all) ? true : false;

function debug(d){
    console.debug(d);
}
function log(d){
    console.log(d);
}

Object.Extend=function(P){
  var C = Class.create();
  var F=function(){};  
  F.prototype=P.prototype;
  C.prototype= new F();
  return C;
}

function bind(obj,fn){
  $(obj).on(fn);
}
function live(obj,fn){
  $(document).on(fn,obj);
}



live('input',{
  focus:function(){
    $(this).addClass('focus');
  },
  blur:function(){
    $(this).removeClass('focus');
  },
  mouseover:function(){
    $(this).focus();
    $(this).select();
  }
});

live('.inputNum',{
  keyup:function() {
    try {
      if ($(this).attr('data') && (isNaN($(this).val()) ||
        parseInt($(this).val())>parseInt($(this).attr('data')))) {

        $(this).val($(this).attr('data'));
      }
    } catch(e){
      $(this).val($(this).attr('data'));
    }
  }
});

 (function(jQuery) {
 
  jQuery.eventEmitter = {
    _JQInit: function() {
      this._JQ = jQuery(this);
    },
    emit: function(evt, data) {
      !this._JQ && this._JQInit();
      this._JQ.trigger(evt, data);
    },
    once: function(evt, handler) {
      !this._JQ && this._JQInit();
      this._JQ.one(evt, handler);
    },
    on: function(evt, handler) {
      !this._JQ && this._JQInit();
      this._JQ.bind(evt, handler);
    },
    off: function(evt, handler) {
      !this._JQ && this._JQInit();
      this._JQ.unbind(evt, handler);
    }
  };
 
}(jQuery));