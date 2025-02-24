const express = require('express');
const { criarEstado, listarEstados, obterEstado, atualizarEstado, deletarEstado } = require('../controllers/estadoController');
const router = express.Router();

router.post('/', criarEstado);
router.get('/', listarEstados);
router.get('/:id', obterEstado);
router.put('/:id', atualizarEstado);
router.delete('/:id', deletarEstado);

module.exports = router;