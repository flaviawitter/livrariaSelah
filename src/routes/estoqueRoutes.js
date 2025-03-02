const express = require('express');
const router = express.Router();
const estoqueController = require('../controllers/estoqueController');

router.get('/estoque', estoqueController.listarEstoque);
router.get('/estoque/:id', estoqueController.buscarEstoquePorId);
router.post('/estoque', estoqueController.adicionarEstoque);
router.put('/estoque/:id', estoqueController.atualizarEstoque);
router.delete('/estoque/:id', estoqueController.excluirEstoque);

module.exports = router;
