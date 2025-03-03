const express = require('express');
const { criarLog, listarLogs, obterLog, deletarLog } = require('../controllers/logController');
const router = express.Router();

router.post('/', criarLog);
router.get('/', listarLogs);
router.get('/:id', obterLog);
router.delete('/:id', deletarLog);

module.exports = router;
