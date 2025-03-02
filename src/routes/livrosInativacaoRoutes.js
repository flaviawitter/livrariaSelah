const express = require('express');
const router = express.Router();
const livrosInativacaoController = require('../controllers/livrosInativacaoController');

router.get('/livros-inativacao', livrosInativacaoController.listarLivrosInativacao);
router.get('/livros-inativacao/:id', livrosInativacaoController.buscarLivrosInativacaoPorId);
router.post('/livros-inativacao', livrosInativacaoController.criarLivrosInativacao);
router.put('/livros-inativacao/:id', livrosInativacaoController.atualizarLivrosInativacao);
router.delete('/livros-inativacao/:id', livrosInativacaoController.excluirLivrosInativacao);

module.exports = router;
