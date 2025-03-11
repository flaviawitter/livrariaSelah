const express = require('express');
const { criarCliente, listarClientes, obterCliente, obterClienteCpf, atualizarCliente, deletarCliente } = require('../controllers/clienteController');

const router = express.Router();

router.post('/', criarCliente);
router.get('/', listarClientes);
//router.get('/:id', obterCliente);
router.get('/:cpf', obterClienteCpf);
router.put('/:id', atualizarCliente);
router.delete('/:id', deletarCliente);

module.exports = router;
