(function( window, undefined ) {
    var _frame = {};
    _frame = function(frameName){
        this.name = frameName;
        var _obj = selector('gameFrame', frameName);
        this.__defineGetter__('vis', function(){
            return _obj.style.display != 'none';
        });
        this.__defineSetter__('vis', function(value){
            if (value) {
                group(this.group).forEach(function(_obj){
                    console.log(_obj.name);
                    _obj.vis = false;
                });
            }
            _obj.style.display = value ? 'inline':'none';
        });
    }
    group = function(groupName){
        var group = [];
        if (!groupName)
            return gorup;
        for (var i in _frame) {
            if (_frame[i].group == groupName) {
                group.push(_frame[i]);
            }
        }
        return group;
    }
    zGame = function() {
        
    }
    zGame.frame = function(frameName){
        if (!_frame[frameName]) {
            _frame[frameName] = new _frame(frameName);
        }
        return _frame[frameName];
    }
    zGame.group = group;
    function selector(target, name) {
        return document.querySelector('['+target+'=\''+name+'\']')
    }

    window.zGame = zGame;
})( window );