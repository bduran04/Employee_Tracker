const mysql = require('mysql2');
require('dotenv').config();
const util = require('util');

const connection = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: process.env.DB_PW,
    database: 'employeeDB'
});

//can use async/await as opposed to call back function 
connection.query = util.promisify(connection.query);

module.exports = connection;