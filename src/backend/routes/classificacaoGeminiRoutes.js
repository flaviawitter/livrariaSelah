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

Receba uma mensagem do usuário, e se essa mensagem contiver o nome de um livro, ou algo que claramente se refira a um livro (como "baseado no livro tal", "parecido com tal livro", "gostei de tal livro", "me sugira um livro de romance" (ou algum gênero literário), "existe/sugira algum livro sobre/chamado..." etc), então:

→ Sugira um livro parecido que o usuário possa gostar, e inclua uma sinopse breve desse livro sugerido, não crie sinopse fictícia, se não houver o livro que ele pediu/perguntou somente diga que não encontrou uma correspondência exata.

Se a mensagem do usuário **não tiver nenhuma referência clara a um livro, autor ou tema literário** (por exemplo, "qual tenis mais recente da nike", "qual o nome da banda de 90?", "em que time o neymar joga?"), responda educadamente:

"Desculpa, não posso ajudar com isso no momento, mas se quiser, posso sugerir um livro para você."

Formato de resposta: 

Caso 1 — Quando houver referência a um livro:
Sugestão: [nome do livro sugerido]  
Sinopse: [sinopse do livro sugerido]

Caso 2 — Quando não houver referência literária:
Desculpa, não posso ajudar com isso no momento, mas se quiser, posso sugerir um livro para você.
`;

        const result = await model.generateContent(`${prompt}\n\nMensagem do usuário: "${livro}"`);
        const response = await result.response;
        const text = response.text();

        res.json({ resposta: text });

    } catch (error) {
        console.error('Erro na rota /avaliar:', error);
        res.status(500).json({ error: 'Erro ao processar sua solicitação' });
    }
});

module.exports = router;
