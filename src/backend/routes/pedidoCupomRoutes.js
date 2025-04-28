const express = require('express');
const router = express.Router();
const { criarPedidoCupom } = require('../controllers/pedidoCupomController');

router.post('/', criarPedidoCupom);

module.exports = router;
