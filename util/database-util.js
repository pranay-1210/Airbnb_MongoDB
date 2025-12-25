const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'a4b3c2d1??',
    database: 'airbnb'
});

module.exports = pool.promise();