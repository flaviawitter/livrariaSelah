const express = require('express');
const router = express.Router();
const carrinhoController = require('../controllers/carrinhoController');

router.get('/', carrinhoController.listarCarrinho);
router.get('/:id', carrinhoController.buscarItemCarrinhoPorId);
router.post('/', carrinhoController.adicionarItemCarrinho);
router.put('/:id', carrinhoController.atualizarItemCarrinho);
router.delete('/:id', carrinhoController.excluirItemCarrinho);

module.exports = router;
