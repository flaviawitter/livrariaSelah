const express = require('express');
const { criarTipoTelefone, listarTiposTelefone, obterTipoTelefone, atualizarTipoTelefone, deletarTipoTelefone } = require('../controllers/tipoTelefoneController');

const router = express.Router();

router.post('/', criarTipoTelefone); // ✅ POST correto
router.get('/', listarTiposTelefone);
router.get('/:id', obterTipoTelefone);
router.put('/:id', atualizarTipoTelefone);
router.delete('/:id', deletarTipoTelefone);

module.exports = router;
