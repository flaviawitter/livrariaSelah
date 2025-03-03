const express = require('express');
const router = express.Router();
const livrosAtivacaoController = require('../controllers/livrosAtivacaoController');

router.get('/livros-ativacao', livrosAtivacaoController.listarLivrosAtivacao);
router.get('/livros-ativacao/:id', livrosAtivacaoController.buscarLivrosAtivacaoPorId);
router.post('/livros-ativacao', livrosAtivacaoController.criarLivrosAtivacao);
router.put('/livros-ativacao/:id', livrosAtivacaoController.atualizarLivrosAtivacao);
router.delete('/livros-ativacao/:id', livrosAtivacaoController.excluirLivrosAtivacao);

module.exports = router;
