const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'b7zwjjqq7qcww9oh5gbt-mysql.services.clever-cloud.com',
    user: 'ukc5rmg9bwwcxiv7',
    password: 'JFWl2eTlXbuU1czIVseu',
    database: 'b7zwjjqq7qcww9oh5gbt'
})
con.connect((err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("Database connection established")
    }
})

module.exports = con