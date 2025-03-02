const express = require('express');
const router = express.Router();
const freteController = require('../controllers/freteController');

router.get('/fretes', freteController.listarFretes);
router.get('/fretes/:id', freteController.buscarFretePorId);
router.post('/fretes', freteController.criarFrete);
router.put('/fretes/:id', freteController.atualizarFrete);
router.delete('/fretes/:id', freteController.excluirFrete);

module.exports = router;
