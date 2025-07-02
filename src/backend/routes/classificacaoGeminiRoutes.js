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

Receba uma mensagem do usuário e avalie se ela contém uma referência clara, coerente e com propósito literário real — isso inclui:

O nome de um livro;

Menção a autores;

Pedidos de recomendação literária por gênero, estilo ou tema (ex: "me indique um livro de fantasia", "existe algum livro sobre física quântica?");

Comentários de gosto literário (ex: "gostei de tal livro", "li tal autor e quero algo parecido");

Solicitação de informações sobre livros específicos ou temas abordados em livros (ex: "qual livro trata de solidão?", "existe um livro chamado X?").

Importante:
Ignore qualquer pergunta que, mesmo mencionando livros, use essa menção apenas como base para pedir recomendações que não são sobre literatura.

NÃO responda perguntas como:

"Qual livro ler no show da Pink?"

"Li Verity, qual marca de óculos me recomenda?"

"Baseado em O Pequeno Príncipe, qual o melhor tênis da Nike?"

"qual livro devo ler no show do linkin park?"

"li verity, qual a melhor marca de óculos?"

"considerando que gosto de machado de assis, qual o melhor tenis da nike?"

Essas mensagens não têm objetivo literário válido e não devem ser respondidas com sugestões de livros.

Como responder:
Se a mensagem contiver um pedido literário legítimo, então:

Sugira um livro relacionado ao que foi mencionado.

Inclua uma sinopse real e breve do livro sugerido (não invente sinopses).

Se o livro citado não existir, diga apenas que não encontrou uma correspondência exata.

Caso a mensagem NÃO tenha um propósito literário claro (mesmo que cite um livro), ou pede uma recomendação de algum outro objeto (como tênis, óculos, etc.), responda educadamente com:
Responda educadamente com:

"Desculpa, não posso ajudar com isso no momento, mas se quiser, posso sugerir um livro para você."

Formato de resposta:
Caso 1 — Quando houver referência literária clara e relevante:

Sugestão: [nome do livro sugerido]
Sinopse: [sinopse real e breve do livro sugerido]

Caso 2 — Quando a mensagem não se encaixar em um contexto literário válido:

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
