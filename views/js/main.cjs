if(typeof(Storage)=="undefined"){
    alert('您的瀏覽器為舊版本！不支援Loacl Storage！');
    location.href='/';
}

var crlf = '<br/>',
    redirect_index = false,
    conf = <%- JSON.stringify(settings.game)%>,
    SHOWDATE = new Date(<%=new Date().getTime()%>),
    socket = io.connect('http://<%=host%>');

var $ = function (id) {
  if (id=="")
    return;
  return "string" == typeof id ? document.getElementById(id) : id;
};

function put(id, data)
{
    var o = id;
    if (typeof(o) === 'string') {
        o = $(id);
    }
    
    if (o) {
        if (o.tagName === "IMG")
        {
            o.src = data;
        }
        else
        {
            o.innerHTML = data;
        }

    } 
}

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



var userAgent = window.navigator.userAgent;
var isIE = userAgent.indexOf("MSIE") > 0;

window.location.hash = ''; // for older browsers, leaves a # behind

history.pushState('', document.title, window.location.pathname); // nice and clean

try {
    e.defaultPrevented(); // no page reload
} catch (e) {
}

var isIE = (document.all) ? true : false;

var Class = {
  create: function() {
    return function() {
        this.initialize.apply(this, arguments);
    }
  }
}
var Extend = function(destination, source) {
    for (var property in source) {
        destination[property] = source[property];
    }
    return destination;
}
var Bind = function(object, fun) {
    return function() {
        return fun.apply(object, arguments);
    }
}

var BindAsEventListener = function(object, fun) {
    return function(event) {
        return fun.call(object, (event || window.event));
    }
}

function addEventHandler(oTarget, sEventType, fnHandler) {
    if (oTarget.addEventListener) {
        oTarget.addEventListener(sEventType, fnHandler, false);
    } else if (oTarget.attachEvent) {
        oTarget.attachEvent("on" + sEventType, fnHandler);
    } else {
        oTarget["on" + sEventType] = fnHandler;
    }
};
function removeEventHandler(oTarget, sEventType, fnHandler) {
    if (oTarget.removeEventListener) {
        oTarget.removeEventListener(sEventType, fnHandler, false);
    } else if (oTarget.detachEvent) {
        oTarget.detachEvent("on" + sEventType, fnHandler);
    } else {
        oTarget["on" + sEventType] = null;
    }
};

Object.Extend=function(P){
  var C = Class.create();
  var F=function(){};  
  F.prototype=P.prototype;
  C.prototype= new F();
  return C;
}
function $s(obj,style){
  if (style && obj) {
    for (var i in style) {
      obj.style[i]=style[i];
    }
  } 
}
function debug(d){
    console.debug(d);
}
function log(d){
    console.log(d);
}