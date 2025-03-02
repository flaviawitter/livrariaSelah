const express = require('express');
const router = express.Router();
const motivoAtivacaoController = require('../controllers/motivoAtivacaoController');

router.get('/motivos-ativacao', motivoAtivacaoController.listarMotivosAtivacao);
router.get('/motivos-ativacao/:id', motivoAtivacaoController.buscarMotivoAtivacaoPorId);
router.post('/motivos-ativacao', motivoAtivacaoController.criarMotivoAtivacao);
router.put('/motivos-ativacao/:id', motivoAtivacaoController.atualizarMotivoAtivacao);
router.delete('/motivos-ativacao/:id', motivoAtivacaoController.excluirMotivoAtivacao);

module.exports = router;
