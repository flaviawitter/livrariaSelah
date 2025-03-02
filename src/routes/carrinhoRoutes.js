const express = require('express');
const router = express.Router();
const carrinhoController = require('../controllers/carrinhoController');

router.get('/carrinho', carrinhoController.listarCarrinho);
router.get('/carrinho/:id', carrinhoController.buscarItemCarrinhoPorId);
router.post('/carrinho', carrinhoController.adicionarItemCarrinho);
router.put('/carrinho/:id', carrinhoController.atualizarItemCarrinho);
router.delete('/carrinho/:id', carrinhoController.excluirItemCarrinho);

module.exports = router;
