const express = require('express');
const router = express.Router();
const cupomController = require('../controllers/cupomController');

router.get('/cupons', cupomController.listarCupons);
router.get('/cupons/:id', cupomController.buscarCupomPorId);
router.post('/cupons', cupomController.criarCupom);
router.put('/cupons/:id', cupomController.atualizarCupom);
router.delete('/cupons/:id', cupomController.excluirCupom);

module.exports = router;
