const express = require('express');
const { criarCliente, listarClientes, obterCliente, atualizarCliente, deletarCliente } = require('../controllers/clienteController');

const router = express.Router();

router.post('/clientes', criarCliente);
router.get('/clientes', listarClientes);
router.get('/clientes/:id', obterCliente);
router.put('/clientes/:id', atualizarCliente);
router.delete('/clientes/:id', deletarCliente);

module.exports = router;
