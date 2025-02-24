const express = require('express');
const { criarCidade, listarCidades, obterCidade, atualizarCidade, deletarCidade } = require('../controllers/cidadeController');
const router = express.Router();

router.post('/', criarCidade);
router.get('/', listarCidades);
router.get('/:id', obterCidade);
router.put('/:id', atualizarCidade);
router.delete('/:id', deletarCidade);

module.exports = router;