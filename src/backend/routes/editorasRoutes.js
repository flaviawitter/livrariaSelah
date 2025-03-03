const express = require('express');
const router = express.Router();
const editorasController = require('../controllers/editorasController');

router.get('/editoras', editorasController.listarEditoras);
router.get('/editoras/:id', editorasController.buscarEditoraPorId);
router.post('/editoras', editorasController.criarEditora);
router.put('/editoras/:id', editorasController.atualizarEditora);
router.delete('/editoras/:id', editorasController.excluirEditora);

module.exports = router;
