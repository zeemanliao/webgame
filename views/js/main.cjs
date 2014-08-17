if(!Modernizr.localstorage){
    alert('您的瀏覽器為舊版本！不支援Loacl Storage！');
    location.href='/';
}

var crlf = '<br/>',
    redirect_index = false,
    conf = <%- JSON.stringify(settings.game)%>,
    SHOWDATE = new Date(<%=new Date().getTime()%>),
    socket = io.connect('http://<%=host%>');


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