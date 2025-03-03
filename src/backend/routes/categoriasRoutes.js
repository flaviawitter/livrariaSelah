const express = require('express');
const router = express.Router();
const categoriasController = require('../controllers/categoriasController');

router.get('/categorias', categoriasController.listarCategorias);
router.get('/categorias/:id', categoriasController.buscarCategoriaPorId);
router.post('/categorias', categoriasController.criarCategoria);
router.put('/categorias/:id', categoriasController.atualizarCategoria);
router.delete('/categorias/:id', categoriasController.excluirCategoria);

module.exports = router;
