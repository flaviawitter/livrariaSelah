const express = require('express');
const { criarEndereco, listarEnderecos, obterEndereco, atualizarEndereco, deletarEndereco } = require('../controllers/enderecoController');
const router = express.Router();

router.post('/', criarEndereco);
router.get('/', listarEnderecos);
router.get('/:id', obterEndereco);
router.put('/:id', atualizarEndereco);
router.delete('/:id', deletarEndereco);

module.exports = router;