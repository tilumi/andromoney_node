const moment = require('moment');
const logger = require('./logger').logger;
var connection_pool = require('./db_connection_factory').get_connection_pool();
exports.batch_send_email = async function () {
    var users = await connection_pool.query("SELECT * FROM users LIMIT 10000");
    users.forEach(user => {
        var max_update_time = await connection_pool.query("SELECT MAX(update_time) as max_update_time FROM record_table WHERE user_id = ?", [user.id]);
        if (moment(max_update_time).isBefore(moment().subtract(1, 'months'))) {
            exports.send_email(user);
        }
    });
}

exports.send_email = async function (user) {
    return user.email;
}