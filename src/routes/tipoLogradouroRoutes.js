const express = require('express');
const { criarTipoLogradouro, listarTiposLogradouro, obterTipoLogradouro, atualizarTipoLogradouro, deletarTipoLogradouro } = require('../controllers/tipoLogradouroController');
const router = express.Router();

router.post('/', criarTipoLogradouro);
router.get('/', listarTiposLogradouro);
router.get('/:id', obterTipoLogradouro);
router.put('/:id', atualizarTipoLogradouro);
router.delete('/:id', deletarTipoLogradouro);

module.exports = router;