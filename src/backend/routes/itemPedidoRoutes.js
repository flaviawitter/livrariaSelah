const express = require('express');
const router = express.Router();
const itemPedidoController = require('../controllers/itemPedidoController');

router.get('/', itemPedidoController.listarItensPedido);
router.get('/:id', itemPedidoController.buscarItemPedidoPorId);
router.post('/', itemPedidoController.adicionarItemPedido);
router.put('/:id', itemPedidoController.atualizarItemPedido);
router.delete('/:id', itemPedidoController.excluirItemPedido);

module.exports = router;
