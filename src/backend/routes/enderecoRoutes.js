const express = require('express');
const { criarEndereco, listarEnderecos, obterEndereco, atualizarEndereco, deletarEndereco, criarEnderecoNovo } = require('../controllers/enderecoController');
const router = express.Router();

router.post('/', criarEndereco);
router.post('/:idCliente', criarEnderecoNovo);
router.get('/', listarEnderecos);
router.get('/:id', obterEndereco);
router.put('/:id', atualizarEndereco);
router.delete('/:id', deletarEndereco);

module.exports = router;