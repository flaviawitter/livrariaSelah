const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Listar todas as inativações de livros
const listarLivrosInativacao = async (req, res) => {
    try {
        const inativacoes = await prisma.livrosInativacao.findMany({
            include: {
                livro: true,
                motivo: true
            }
        });
        res.json(inativacoes);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar inativações de livros." });
    }
};

// Buscar inativação de livro por ID
const buscarLivrosInativacaoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const inativacao = await prisma.livrosInativacao.findUnique({
            where: { id: Number(id) },
            include: {
                livro: true,
                motivo: true
            }
        });
        if (!inativacao) return res.status(404).json({ erro: "Inativação de livro não encontrada." });
        res.json(inativacao);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar a inativação do livro." });
    }
};

// Criar um novo registro de inativação de livro
const criarLivrosInativacao = async (req, res) => {
    const { livro_id, motivo_id } = req.body;
    try {
        const novaInativacao = await prisma.livrosInativacao.create({
            data: { 
                livro_id: Number(livro_id), 
                motivo_id: Number(motivo_id) 
            }
        });
        res.status(201).json(novaInativacao);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao registrar inativação do livro." });
    }
};

// Atualizar um registro de inativação de livro existente
const atualizarLivrosInativacao = async (req, res) => {
    const { id } = req.params;
    const { livro_id, motivo_id } = req.body;
    try {
        const inativacaoAtualizada = await prisma.livrosInativacao.update({
            where: { id: Number(id) },
            data: { 
                livro_id: Number(livro_id), 
                motivo_id: Number(motivo_id) 
            }
        });
        res.json(inativacaoAtualizada);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao atualizar inativação do livro." });
    }
};

// Excluir um registro de inativação de livro
const excluirLivrosInativacao = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.livrosInativacao.delete({ where: { id: Number(id) } });
        res.json({ mensagem: "Registro de inativação do livro excluído com sucesso." });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao excluir inativação do livro." });
    }
};

module.exports = { listarLivrosInativacao, buscarLivrosInativacaoPorId, criarLivrosInativacao, atualizarLivrosInativacao, excluirLivrosInativacao };
