const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


router.post('/avaliar', async (req, res) => {
    const { livro } = req.body;

    if (!livro) {
        return res.status(400).json({ error: 'O nome do livro é obrigatório' });
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `

    Você é um assistente especializado em livros.

Se o texto "${livro}" não parecer ser o nome de um livro, ou for uma pergunta que não esteja relacionada a livros, 
responda educadamente: 
"Desculpa, não posso ajudar com isso no momento, mas se quiser, posso sugerir um livro para você."

Se for de fato o nome de um livro, então sugira um livro similar que o leitor possa gostar, com uma sinopse breve sobre ele.

Responda sempre no seguinte formato:

Sugestão: [nome do livro sugerido]
Sinopse: [sinopse do livro sugerido]
Ou:
[Mensagem educada conforme o caso]
`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ resposta: text });

    } catch (error) {
        console.error('Erro na rota /avaliar:', error);
        res.status(500).json({ error: 'Erro ao processar sua solicitação' });
    }
});

module.exports = router;
