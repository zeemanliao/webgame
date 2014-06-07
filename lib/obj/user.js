var settings = require('../settings');
var pool = require('../db');
var tableName = 'chara';
var clone = require('../util/clone');
var util = require('../util/tool');
var Game = require('../game');

/*
function Pet(){
    this.data = {
        uid : 0,
      petid : 0,
        num : 1,
        team: 99,
        sn:0
    }
}
*/

function User() {
    this.uid = 0;
    this.tmp = {};
    this.redata={};
    this.data = {
        uid: this.uid,
        source: 'FB',
        nam: '',
        acc: '',
        pwd: '', //密碼        
        vipgold: 0, //目前vip幣
        level: 1, //等級
        ex: 0, //經驗
        cex: 10, //組隊petid1,petid2 petid1,petid3
        bag: 10,
        storage: 20,
        hp: 0,
        dmg: 0,
        mag: 0,
        def: 0,
        photo: '',
        map:0
    };
    this.savecheckdata = {}; //存檔用
    this.updatecheckdata = {}; //更新Client端用
    //this.clone_data = JSON.parse(JSON.stringify(this.data));
}

module.exports = User;

User.prototype.leave = function() {
    if (this.tmp.team)
        this.tmp.team.leave(this);
}
/*
*/
User.prototype.move = function(data,callback) {

  this.tmp.battle = 0;

  this.tmp.city = data;

  this.redata.city = {move:this.tmp.city};

  this.socket.leave('map_*');

  this.leave();

  this.emit();

  return callback ? callback(): null;
}
/*
    所有的Client Data
*/
User.prototype.allData = function() {
    return {
        nam: this.data.nam,
        gold: this.data.gold,
        vipgold: this.data.vipgold,
        level: this.data.level,
        ex: this.data.ex,
        cex: this.data.cex,
        bag: this.data.bag,
        storage: this.data.storage,
        hp: this.data.hp,
        dmg: this.data.dmg,
        mag: this.data.mag,
        def: this.data.def,
        photo: this.data.photo,
        map: this.data.map
    };
}


User.prototype.emit = function() {
    if (!this.socket)
        return console.log('User.updateData no find socket');
    var u = this.u_data();
    
    if (Object.keys(u).length > 0) {
        if (this.redata) {
            this.redata.chara={update:u};
        } else {
            this.redata = {
                chara:{update: u}
            };
        }
    }

    if (Object.keys(this.redata).length > 0) {
        this.socket.emit('update Data', this.redata);
        this.redata = {};
    }
};

/*
    比對兩個資料是否一樣
*/
User.prototype.getChangeData = function(data, data2) {
    var changeData = {};
    if (data2 == null)
        data2 = this.data;
    for (var i in data2) {
        if (data2[i] != data[i]) {
            changeData[i] = data2[i];
        }
    }
    return changeData;
    //callback(changeData);
};
//將data2的資料copy到data中
User.prototype.copyData = function(data, data2) {
    for (var i in data) {
        data[i] = data2[i];
    }
}

User.prototype.save = function(callback) {
    var self = this;

    if (!self.uid) {
        pool.getConnection(function(err, connection) {
            if (err)
                return callback ? callback(err) : null;

            var sql = 'INSERT INTO ' + tableName + ' SET ?';

            var insert_data = {
                nam: self.data.nam,
                source: self.data.source,
                acc: self.data.acc,
                pwd: self.data.pwd
            };
            connection.query(sql, insert_data, function(err, result) {
                connection.release();

                if (err)
                    return callback ? callback(err) : null;

            });
        });
    } else {
        data = this.getChangeData(self.savecheckdata); //,function(data){

        if (Object.keys(data).length > 0) {

            pool.getConnection(function(err, connection) {
                if (err)
                    return callback ? callback(err) : null;

                var sql = 'UPDATE ' + tableName + ' SET ? WHERE uid=' + self.uid;

                connection.query(sql, data, function(err, result) {
                    connection.release();

                    if (err)
                        return callback ? callback(err) : null;

                    //把資料回存savecheckdata
                    self.savecheckdata = clone(self.data);
                });
            });
        }
        //});
        return callback ? callback(null) : null;
    }
    return callback ? callback(null) : null;
}

User.prototype.put = function(data) {

    this.data = data;
    this.uid = this.data.uid;
    this.savecheckdata = clone(data);
    this.updatecheckdata = clone(data);
}

/*
    有修改的Data
*/
User.prototype.u_data = function() {
    this.checkVal();

    var data = this.getChangeData(this.updatecheckdata);
    this.updatecheckdata = clone(this.data);
    return data;
}
/*
    取得沒有用到的sn
    num為取得的筆數,沒指定為一筆
*/
User.prototype.getSN = function(num, callback) {
    var sn = new Array();
    var tmp_sn = 0;
    var chk = 10000; //避免無限迴圈用
    while (sn.length < num && chk > 0) {
        chk--;
        tmp_sn++;
        if (!this.pets[tmp_sn]) { //是否此sn已存在
            sn.push(tmp_sn);
        }
    }

    //取得新序號錯誤
    if (sn.length != num)
        return callback(lang.err.E0014 + sn.toString());

    callback(null, sn);
}
/*
    確認數值不超出範圍
*/
User.prototype.checkVal = function() {
    //this.data.hp = this.data.hp>this.data.maxhp?this.data.maxhp:this.data.hp;
    //this.data.mv = this.data.mv>this.data.maxmv?this.data.maxmv:this.data.mv;
}
/*
    確認帳號或暱稱是否存在
*/
User.checkAccount = function checkAccount(data, callback) {
    if (data.length < 1) {
        //傳入參數不正確
        return callback(lang.err.E0013 + data + '!');
    }

    pool.getConnection(function(err, connection) {
        if (err)
            return callback(err);

        var sql = 'SELECT * FROM ' + tableName + ' WHERE acc = ? or nam = ?';
        connection.query(sql, [data.acc, data.nam], function(err, results) {

            connection.release();

            if (err)
                return callback(err);

            if (results.length > 0) {
                if (results[0].acc == data.acc) {
                    //帳號已被使用!
                    return callback(lang.err.E0010);
                } else {
                    //暱稱已被使用!
                    return callback(lang.err.E0011);
                }
            }
            return callback(null);
        });
    });
}

User.get = function (wh, callback) {

    pool.getConnection(function(err, connection) {
        if (err)
            return callback(err);


        var sql = 'SELECT * FROM ' + tableName + ' WHERE ?';
        connection.query(sql, wh, function(err, results) {

            connection.release();

            if (err)
                return callback(err);

            //找不到此帳號
            if (!results[0])
                return callback(lang.err.E0012 + '「' + wh.acc + '」!');

            var usr = new User();
            usr.put(results[0]);
            return callback(null, usr);

        });
    });
}