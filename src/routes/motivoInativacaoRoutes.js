const express = require('express');
const router = express.Router();
const motivoInativacaoController = require('../controllers/motivoInativacaoController');

router.get('/motivos-inativacao', motivoInativacaoController.listarMotivos);
router.get('/motivos-inativacao/:id', motivoInativacaoController.buscarMotivoPorId);
router.post('/motivos-inativacao', motivoInativacaoController.criarMotivo);
router.put('/motivos-inativacao/:id', motivoInativacaoController.atualizarMotivo);
router.delete('/motivos-inativacao/:id', motivoInativacaoController.excluirMotivo);

module.exports = router;
