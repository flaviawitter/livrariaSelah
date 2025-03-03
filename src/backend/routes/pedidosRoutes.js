const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidosController');

router.get('/pedidos', pedidosController.listarPedidos);
router.get('/pedidos/:id', pedidosController.buscarPedidoPorId);
router.post('/pedidos', pedidosController.criarPedido);
router.put('/pedidos/:id', pedidosController.atualizarPedido);
router.delete('/pedidos/:id', pedidosController.excluirPedido);

module.exports = router;
