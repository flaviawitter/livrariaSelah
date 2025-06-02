require('dotenv').config();
const axios = require('axios');

const HF_API_KEY = process.env.HUGGING_FACE_API_KEY;

async function analisarSentimento(texto) {
  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment',
      { inputs: texto },
      {
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Erro na análise de sentimento:', error.response?.data || error.message);
    throw new Error('Erro ao processar a análise de sentimento');
  }
}

function interpretarSentimento(respostaAPI) {
  const labels = {
    LABEL_0: 'Negativo',
    LABEL_1: 'Neutro',
    LABEL_2: 'Positivo',
  };

  const analise = respostaAPI[0];
  const maisProvavel = analise.reduce((prev, current) =>
    prev.score > current.score ? prev : current
  );

  return {
    sentimento: labels[maisProvavel.label],
    confianca: (maisProvavel.score * 100).toFixed(2) + '%',
  };
}

module.exports = { analisarSentimento, interpretarSentimento };
