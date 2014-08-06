var db = require('./MysqlAccessBase');
var tool = require('../../util/tool');


var tableName = 'item';

module.exports = {
  getByPlayerID:function(playerID, callback) {
    var self = this;

    db.selectFirstRow('SELECT data FROM ' + tableName + ' WHERE playerID = ?', playerID,
    function(err, result) {
      if (err)
        return callback(err);

      if (tool.isUndefinedOrNull(result)) {
        self.create(playerID, function (err){
          if (err)
            return callback(err);

          callback(null, {});
        });

      } else {
        return callback(null, JSON.parse(result.data));
      }
    });
  },

  create:function(playerID, callback) {
    db.update('INSERT INTO ' + tableName + ' SET ?', {playerID:playerID,data:'[]'},
    function(err, affectedRows){
      if (err)
        return callback(err);

      if (affectedRows == 0)
        return callback(null, 0);
      
      return callback(null, affectedRows);
    });
  },

  save:function(playerID, data, callback){
    db.update('UPDATE ' + tableName + ' SET ? WHERE playerID=?', [{data:JSON.stringify(data)}, playerID],

    function(err, affectedRows){
      if (err)
        return callback(err);

      return callback(null, affectedRows);
    });
  }
};
