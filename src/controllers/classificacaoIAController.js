const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Listar todas as classificações
const listarClassificacoesIA = async (req, res) => {
    try {
        const classificacoes = await prisma.classificacaoIA.findMany({
            include: {
                livro: true,
                cliente: true
            }
        });
        res.json(classificacoes);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar classificações da IA." });
    }
};

// Buscar classificação por ID
const buscarClassificacaoIAPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const classificacao = await prisma.classificacaoIA.findUnique({
            where: { id: Number(id) },
            include: {
                livro: true,
                cliente: true
            }
        });
        if (!classificacao) return res.status(404).json({ erro: "Classificação não encontrada." });
        res.json(classificacao);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar a classificação da IA." });
    }
};

// Criar uma nova classificação
const criarClassificacaoIA = async (req, res) => {
    const { descricao, livroId, clienteId } = req.body;
    try {
        const novaClassificacao = await prisma.classificacaoIA.create({
            data: { 
                descricao, 
                livroId: Number(livroId), 
                clienteId: Number(clienteId)
            }
        });
        res.status(201).json(novaClassificacao);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao criar classificação da IA." });
    }
};

// Atualizar uma classificação existente
const atualizarClassificacaoIA = async (req, res) => {
    const { id } = req.params;
    const { descricao, livroId, clienteId } = req.body;
    try {
        const classificacaoAtualizada = await prisma.classificacaoIA.update({
            where: { id: Number(id) },
            data: { 
                descricao, 
                livroId: Number(livroId), 
                clienteId: Number(clienteId)
            }
        });
        res.json(classificacaoAtualizada);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao atualizar classificação da IA." });
    }
};

// Remover uma classificação
const excluirClassificacaoIA = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.classificacaoIA.delete({ where: { id: Number(id) } });
        res.json({ mensagem: "Classificação excluída com sucesso." });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao excluir classificação da IA." });
    }
};

module.exports = { listarClassificacoesIA, buscarClassificacaoIAPorId, criarClassificacaoIA, atualizarClassificacaoIA, excluirClassificacaoIA };
