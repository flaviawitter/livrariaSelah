const express = require('express');
const router = express.Router();
const livrosController = require('../controllers/livrosController');

router.get('/buscar', livrosController.buscarLivrosPorTermo);

router.get('/', livrosController.listarLivros);
router.get('/:id', livrosController.buscarLivroPorId);
router.post('/', livrosController.criarLivro);
router.put('/:id', livrosController.atualizarLivro);
router.delete('/:id', livrosController.excluirLivro);
router.post('/avaliar', livrosController.avaliarLivro);

module.exports = router;
