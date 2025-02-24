const express = require('express');
const { criarTelefone, listarTelefones, obterTelefone, atualizarTelefone, deletarTelefone } = require('../controllers/telefoneController');
const router = express.Router();

router.post('/', criarTelefone);
router.get('/', listarTelefones);
router.get('/:id', obterTelefone);
router.put('/:id', atualizarTelefone);
router.delete('/:id', deletarTelefone);

module.exports = router;