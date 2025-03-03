const express = require('express');
const { criarPais, listarPaises, obterPais, atualizarPais, deletarPais } = require('../controllers/paisController');
const router = express.Router();

router.post('/', criarPais);
router.get('/', listarPaises);
router.get('/:id', obterPais);
router.put('/:id', atualizarPais);
router.delete('/:id', deletarPais);

module.exports = router;