const mysql = require('mysql');

// DB Setup
const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    multipleStatements: true,
    dateStrings: true
});

const service = (function() {

    function getConnectionFromPool() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    reject('Something went wrong when getting the connection');
                } else {
                    resolve(connection);
                }
            });
        });
    }

    function query(query_str, query_var, showQuery) {
        return new Promise(async function(resolve, reject) {
            const connection = await getConnectionFromPool();

            if (showQuery) {
                let sql = query_str;

                for (let i in query_var) {
                    sql = sql.replace('?', query_var[i]);
                }

                console.log(sql);
            }

            if(query_var) {
                connection.query(query_str, query_var, function (err, rows, fields) {
                    if (err) {
                        connection.release();
                        return reject(err.sqlMessage);
                    }

                    if (query_str.search(/CALL /g) !== -1) {
                        resolve(rows[0]);
                    } else {
                        resolve(rows);
                    }

                    connection.release();
                });
            } else {
                connection.query(query_str, function (err, rows, fields) {
                    if (err) {
                        return reject(err.sqlMessage);
                    }

                    if (query_str.search(/CALL /g) !== -1) {
                        resolve(rows[0]);
                    } else {
                        resolve(rows);
                    }

                    connection.release();
                });
            }
        });
    }

    return {
        query,
    }

})();

module.exports = service;
