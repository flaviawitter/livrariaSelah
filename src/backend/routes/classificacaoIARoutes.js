const express = require('express');
const router = express.Router();
const classificacaoIAController = require('../controllers/classificacaoIAController');

router.get('/classificacoesIA', classificacaoIAController.listarClassificacoesIA);
router.get('/classificacoesIA/:id', classificacaoIAController.buscarClassificacaoIAPorId);
router.post('/classificacoesIA', classificacaoIAController.criarClassificacaoIA);
router.put('/classificacoesIA/:id', classificacaoIAController.atualizarClassificacaoIA);
router.delete('/classificacoesIA/:id', classificacaoIAController.excluirClassificacaoIA);

module.exports = router;
