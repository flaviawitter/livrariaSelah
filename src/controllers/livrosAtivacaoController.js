const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const listarLivrosAtivacao = async (req, res) => {
    try {
        const ativacoes = await prisma.livrosAtivacao.findMany({
            include: {
                livro: true,
                motivo: true
            }
        });
        res.json(ativacoes);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar ativações de livros." });
    }
};

const buscarLivrosAtivacaoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const ativacao = await prisma.livrosAtivacao.findUnique({
            where: { id: Number(id) },
            include: {
                livro: true,
                motivo: true
            }
        });
        if (!ativacao) return res.status(404).json({ erro: "Ativação de livro não encontrada." });
        res.json(ativacao);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar a ativação do livro." });
    }
};

const criarLivrosAtivacao = async (req, res) => {
    const { livro_id, motivo_id } = req.body;
    try {
        const novaAtivacao = await prisma.livrosAtivacao.create({
            data: { 
                livro_id: Number(livro_id), 
                motivo_id: Number(motivo_id) 
            }
        });
        res.status(201).json(novaAtivacao);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao registrar ativação do livro." });
    }
};

// Atualizar um registro de ativação de livro existente
const atualizarLivrosAtivacao = async (req, res) => {
    const { id } = req.params;
    const { livro_id, motivo_id } = req.body;
    try {
        const ativacaoAtualizada = await prisma.livrosAtivacao.update({
            where: { id: Number(id) },
            data: { 
                livro_id: Number(livro_id), 
                motivo_id: Number(motivo_id) 
            }
        });
        res.json(ativacaoAtualizada);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao atualizar ativação do livro." });
    }
};

const excluirLivrosAtivacao = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.livrosAtivacao.delete({ where: { id: Number(id) } });
        res.json({ mensagem: "Registro de ativação do livro excluído com sucesso." });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao excluir ativação do livro." });
    }
};

module.exports = { listarLivrosAtivacao, buscarLivrosAtivacaoPorId, criarLivrosAtivacao, atualizarLivrosAtivacao, excluirLivrosAtivacao };
