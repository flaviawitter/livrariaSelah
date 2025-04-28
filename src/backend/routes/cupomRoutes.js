const express = require('express');
const router = express.Router();
const cupomController = require('../controllers/cupomController');

router.get('/', cupomController.listarCupons);
router.get('/clienteId/:idCliente', cupomController.listarCuponsPorCliente);
router.get('/:id', cupomController.buscarCupomPorId);
router.post('/', cupomController.criarCupom);
router.put('/:id', cupomController.atualizarCupom);
router.delete('/:id', cupomController.excluirCupom);

module.exports = router;
