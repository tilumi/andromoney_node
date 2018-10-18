var mysql = require('promise-mysql');
var pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE
});

exports.get_db_connection = function(){
    return pool.getConnection();
}

exports.get_connection_pool = function(){
    return pool;
}