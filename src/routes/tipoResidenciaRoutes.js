const express = require('express');
const { criarTipoResidencia, listarTiposResidencia, obterTipoResidencia, atualizarTipoResidencia, deletarTipoResidencia } = require('../controllers/tipoResidenciaController');
const router = express.Router();

router.post('/', criarTipoResidencia);
router.get('/', listarTiposResidencia);
router.get('/:id', obterTipoResidencia);
router.put('/:id', atualizarTipoResidencia);
router.delete('/:id', deletarTipoResidencia);

module.exports = router;
