const express = require('express');
const { criarBandeiraCartao, listarBandeirasCartao, obterBandeiraCartao, atualizarBandeiraCartao, deletarBandeiraCartao } = require('../controllers/bandeiraCartaoController');
const router = express.Router();

router.post('/', criarBandeiraCartao);
router.get('/', listarBandeirasCartao);
router.get('/:id', obterBandeiraCartao);
router.put('/:id', atualizarBandeiraCartao);
router.delete('/:id', deletarBandeiraCartao);

module.exports = router;