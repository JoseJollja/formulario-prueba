const Pool = require("pg").Pool;

const pool = new Pool({
    user:'formulario',
    host:'163.123.183.91',
    database:'formulario',
    password:'formulario',
    port:'17392'
});

module.exports = pool;