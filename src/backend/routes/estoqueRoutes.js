const express = require('express');
const router = express.Router();
const estoqueController = require('../controllers/estoqueController');

router.get('/', estoqueController.listarEstoque);
router.get('/:id', estoqueController.buscarEstoquePorId);
router.post('/', estoqueController.adicionarEstoque);
router.put('/:id', estoqueController.atualizarEstoque);
router.delete('/:id', estoqueController.excluirEstoque);
router.patch('/:id', estoqueController.diminuirQuantidadeLivro);
router.patch('/acrescentar/:id', estoqueController.acrescentarQuantidadeLivro);


module.exports = router;
