const express = require("express");

const router = express.Router();

const Cliente = require('../controllers/Cliente');

//Get all todos.
//Get all todos.
router.get('/clientes/:page/:numberpage', async(req, res) => {
    let { numberpage } = req.params;
    let { page } = req.params;

    let clientes = await new Cliente().getClientes(page, numberpage);
    return res.status(200).json({ clientes });
});
router.get('/clientesPromedioEdad', async(req, res) => {
    let promedioEdad = await new Cliente().getPromedioEdadClientes();
    return res.status(200).json({ promedioEdad });
});


//Create a todo.
router.post('/clientes', async(req, res) => {
    let { nombres } = req.body;
    let { apellidos } = req.body;
    let { fechanacimiento } = req.body;
    let cliente = await new Cliente().createClientes({ nombres, apellidos, fechanacimiento }, res);
    return res.status(200).json({ cliente });
});

module.exports = router;