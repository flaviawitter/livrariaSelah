const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidosController');

router.get('/', pedidosController.listarPedidos);
router.get('/:id', pedidosController.buscarPedidoPorId);
router.post('/', pedidosController.criarPedido);
router.put('/:id', pedidosController.atualizarPedido);
router.delete('/:id', pedidosController.excluirPedido);
router.get('/cliente/:id', pedidosController.listarPedidosPorCliente);


module.exports = router;
