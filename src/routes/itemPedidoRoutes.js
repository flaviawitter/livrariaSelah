const express = require('express');
const router = express.Router();
const itemPedidoController = require('../controllers/itemPedidoController');

router.get('/itens-pedido', itemPedidoController.listarItensPedido);
router.get('/itens-pedido/:id', itemPedidoController.buscarItemPedidoPorId);
router.post('/itens-pedido', itemPedidoController.adicionarItemPedido);
router.put('/itens-pedido/:id', itemPedidoController.atualizarItemPedido);
router.delete('/itens-pedido/:id', itemPedidoController.excluirItemPedido);

module.exports = router;
