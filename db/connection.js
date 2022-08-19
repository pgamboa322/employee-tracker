const mySQL = require('mysql2');
require('dotenv').config();

const connection = mySQL.createConnection(
    {
        host: "localhost",
        port: 3306,
        user: "root",
        password: 'root',
        database: "team_tracker_db",
    },
);

 connection.connect((error) => {
     console.log(error);
     if(error) throw error;
 });

 module.exports = connection