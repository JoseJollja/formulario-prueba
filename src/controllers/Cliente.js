const db = require('../config/db');

class Cliente {

    //get all.
    async getClientes(page, numberpage) {

        let results = await db.query(
            `SELECT * FROM clientes`
        ).catch(console.log);

        return results.rows.slice((page - 1) * numberpage, page * numberpage);
    };
    //Get Promedio Edad
    async getPromedioEdadClientes() {
        let results = await db.query(
            `SELECT * FROM clientes`
        ).catch(console.log);
        var totalAnios = 0;
        for (let index = 0; index < results.rows.length; index++) {

            var sdt = new Date(results.rows[index].fechanacimiento);
            var difdt = new Date(new Date() - sdt);
            var ageDate = new Date(difdt);
            var nroAnios = Math.abs(ageDate.getUTCFullYear() - 1970);
            totalAnios += nroAnios;
        }
        return totalAnios / results.rows.length;
    };

    //create.
    async createClientes(todo) {
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();
        let fechaFinal = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds
        await db.query('INSERT INTO clientes (nombres, apellidos,fechanacimiento,created_at,updated_at) VALUES ($1, $2,$3,$4,$5)', [todo.nombres, todo.apellidos, todo.fechanacimiento, fechaFinal, fechaFinal])
            .catch(console.log);

        let results = await db.query(
            `SELECT * FROM clientes
                ORDER BY clienteid DESC
                LIMIT 1`
        ).catch(console.log);

        return results.rows;
    };
};

module.exports = Cliente;