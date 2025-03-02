const express = require('express');
const router = express.Router();
const livrosCategoriasController = require('../controllers/livrosCategoriasController');

router.get('/livros-categorias', livrosCategoriasController.listarLivrosCategorias);
router.get('/livros-categorias/:livro_id/:categoria_id', livrosCategoriasController.buscarLivroCategoria);
router.post('/livros-categorias', livrosCategoriasController.criarLivroCategoria);
router.delete('/livros-categorias/:livro_id/:categoria_id', livrosCategoriasController.excluirLivroCategoria);

module.exports = router;
