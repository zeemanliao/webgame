
var settings = require('./settings');
var mysql = require('mysql');
var pool = mysql.createPool(settings.db);
// Create a MySQL connection pool with
// a max of 10 connections, a min of 2, and a 30 second max idle time
module.exports = pool;