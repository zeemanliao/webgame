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
    this.__defineGetter__("vis", function(){
        return this.frame.style.visibility=='visible';
    });
    
    this.__defineSetter__("vis", function(val){
        $s(this.frame,{visibility:val?'visible':'hidden'});
    });
    if (typeof(this.click)=='function'){
      addEventHandler(this.frame,"click",BindAsEventListener(this,this._click));
    }
    if (typeof(this.mouseenter)=='function')
      addEventHandler(this.frame,"mouseenter",BindAsEventListener(this,this.mouseenter));
    if (typeof(this.mousemove)=='function')
      addEventHandler(this.frame,"mousemove",BindAsEventListener(this,this.mousemove));
    if (typeof(this.mouseout)=='function')
      addEventHandler(this.frame,"mouseout",BindAsEventListener(this,this.mouseout));
    if (typeof(this.create)=='function'){
      this.create();
    } else {
      this.frame = null;
    }

  },
  remove:function(){
    this.frame.parentNode.removeChild(this.frame);
  },
  _click:function(ev){
    if(ev.stopPropagation) {
      ev.stopPropagation();
    } else {
      ev.returnValue = false;
    }
    this.click(ev);
  },
  append:function(obj){
    if (this.hideAll){
      this.hideAll();
    }
    this.frame.appendChild(obj);
  },
  gid:function(id){
      var elements = this.frame.getElementsByTagName('gid');
      for (var i = 0; i < elements.length; i++) {
           if (elements[i].innerHTML.indexOf(searchString) !== -1) {
               return elements[i];
           }
      }
  }
}

var BaseCityClass = Object.Extend(BaseViewClass);
BaseCityClass.prototype.enter = function(){
  cframe.append(this.frame);
}