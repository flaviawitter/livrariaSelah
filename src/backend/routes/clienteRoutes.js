const express = require('express');
const { criarCliente, listarClientes, obterCliente, atualizarCliente, deletarCliente, atualizarSenha, atualizarStatus } = require('../controllers/clienteController');

const router = express.Router();

router.post('/', criarCliente);
router.get('/', listarClientes);
router.get('/:id', obterCliente);
router.put("/:id/senha", atualizarSenha);
router.put('/:id', atualizarCliente);
router.delete('/:id', deletarCliente);
router.patch('/:id/status', atualizarStatus);


module.exports = router;
