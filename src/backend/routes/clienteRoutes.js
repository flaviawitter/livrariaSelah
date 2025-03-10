const express = require('express');
const { criarCliente, listarClientes, obterCliente, atualizarCliente, deletarCliente } = require('../controllers/clienteController');

const router = express.Router();

router.post('/', criarCliente);
router.get('/', listarClientes);
router.get('/:id', obterCliente);
router.put('/:id', atualizarCliente);
router.delete('/:id', deletarCliente);

module.exports = router;
