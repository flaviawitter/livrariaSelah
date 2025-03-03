const express = require('express');
const { criarCartao, listarCartoes, obterCartao, atualizarCartao, deletarCartao } = require('../controllers/cartaoController');
const router = express.Router();

router.post('/', criarCartao);
router.get('/', listarCartoes);
router.get('/:id', obterCartao);
router.put('/:id', atualizarCartao);
router.delete('/:id', deletarCartao);

module.exports = router;