const express = require('express');
const router = express.Router();

const { analisarSentimento, interpretarSentimento } = require('../service/sentimentoService');

router.post('/sentimento', async (req, res) => {
  const { texto } = req.body;

  if (!texto) {
    return res.status(400).json({ error: 'Texto é obrigatório' });
  }

  try {
    const resultadoAPI = await analisarSentimento(texto);
    const resultado = interpretarSentimento(resultadoAPI);

    res.json({ resultado });
  } catch (error) {
    console.error('Erro na rota /sentimento:', error.message);
    res.status(500).json({ error: 'Erro ao processar a análise de sentimento' });
  }
});

module.exports = router;
