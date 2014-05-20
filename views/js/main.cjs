if(Modernizr.localStorage){
    alert('您的瀏覽器為舊版本！不支援Loacl Storage！');
    location.href='/';
}

var crlf = '<br/>',
    redirect_index = false,
    conf = <%- JSON.stringify(settings.game)%>,
    SHOWDATE = new Date(<%=new Date().getTime()%>),
    socket = io.connect('http://<%=host%>');


function keyDownHandler(e) {
    if (e) { // Firefox
        if (e.keyCode == 116) {
            //F5
            //reflush();
            e.preventDefault();
            e.stopPropagation();
        } else if (e.keyCode == 115) {
            //F4
            e.preventDefault();
            e.stopPropagation();
        }
    } else { // IE
        e=windows.event;
        if (window.event.keyCode == 116) {
            window.event.keyCode = 0;
            //F5
            //reflush();
            return false;
        } else if (window.event.keyCode == 115) {
            window.event.keyCode = 0;
            //F4
            return false;
        }
    }
}
document.onkeydown = keyDownHandler;

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