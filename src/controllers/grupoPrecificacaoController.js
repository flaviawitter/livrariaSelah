const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Listar todos os grupos de precificação
const listarGruposPrecificacao = async (req, res) => {
    try {
        const grupos = await prisma.grupoPrecificacao.findMany();
        res.json(grupos);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar grupos de precificação." });
    }
};

// Buscar grupo de precificação por ID
const buscarGrupoPrecificacaoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const grupo = await prisma.grupoPrecificacao.findUnique({
            where: { id: Number(id) }
        });
        if (!grupo) return res.status(404).json({ erro: "Grupo de precificação não encontrado." });
        res.json(grupo);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar o grupo de precificação." });
    }
};

// Criar um novo grupo de precificação
const criarGrupoPrecificacao = async (req, res) => {
    const { descricao, margem_lucro } = req.body;
    try {
        const novoGrupo = await prisma.grupoPrecificacao.create({
            data: { descricao, margem_lucro: Number(margem_lucro) }
        });
        res.status(201).json(novoGrupo);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao criar grupo de precificação." });
    }
};

// Atualizar um grupo de precificação existente
const atualizarGrupoPrecificacao = async (req, res) => {
    const { id } = req.params;
    const { descricao, margem_lucro } = req.body;
    try {
        const grupoAtualizado = await prisma.grupoPrecificacao.update({
            where: { id: Number(id) },
            data: { descricao, margem_lucro: Number(margem_lucro) }
        });
        res.json(grupoAtualizado);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao atualizar grupo de precificação." });
    }
};

// Excluir um grupo de precificação
const excluirGrupoPrecificacao = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.grupoPrecificacao.delete({ where: { id: Number(id) } });
        res.json({ mensagem: "Grupo de precificação excluído com sucesso." });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao excluir grupo de precificação." });
    }
};

module.exports = { listarGruposPrecificacao, buscarGrupoPrecificacaoPorId, criarGrupoPrecificacao, atualizarGrupoPrecificacao, excluirGrupoPrecificacao };
