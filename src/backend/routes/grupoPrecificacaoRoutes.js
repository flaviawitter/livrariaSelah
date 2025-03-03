const express = require('express');
const router = express.Router();
const grupoPrecificacaoController = require('../controllers/grupoPrecificacaoController');

router.get('/grupo-precificacao', grupoPrecificacaoController.listarGruposPrecificacao);
router.get('/grupo-precificacao/:id', grupoPrecificacaoController.buscarGrupoPrecificacaoPorId);
router.post('/grupo-precificacao', grupoPrecificacaoController.criarGrupoPrecificacao);
router.put('/grupo-precificacao/:id', grupoPrecificacaoController.atualizarGrupoPrecificacao);
router.delete('/grupo-precificacao/:id', grupoPrecificacaoController.excluirGrupoPrecificacao);

module.exports = router;
