const express = require('express');
const { criarCliente, listarClientes, obterCliente, atualizarCliente, deletarCliente, atualizarSenha } = require('../controllers/clienteController');

const router = express.Router();

router.post('/', criarCliente);
router.get('/', listarClientes);
router.get('/:id', obterCliente);
//router.get('/:cpf', obterClienteCpf);
router.put("/:id/senha", atualizarSenha);
router.put('/:id', atualizarCliente);
router.delete('/:id', deletarCliente);

module.exports = router;
