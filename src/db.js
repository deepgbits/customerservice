
var mysql = require('mysql');

class MySqlClient {
    constructor() {
        this.connection = mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DB_NAME
        });
    }

    Execute(sql, handleSuccess, handleError) {

        this.connection.query(sql, function (error, results, fields) {
            if (error) {
                handleError(error)
                return
            }
            handleSuccess(results, fields)
        })
    }
}

module.exports = MySqlClient