const express = require('express');
const { criarTipoEndereco, listarTiposEndereco, obterTipoEndereco, atualizarTipoEndereco, deletarTipoEndereco } = require('../controllers/tipoEnderecoController');
const router = express.Router();

router.post('/', criarTipoEndereco);
router.get('/', listarTiposEndereco);
router.get('/:id', obterTipoEndereco);
router.put('/:id', atualizarTipoEndereco);
router.delete('/:id', deletarTipoEndereco);

module.exports = router;