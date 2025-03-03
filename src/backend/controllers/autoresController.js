const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Listar todos os autores
const listarAutores = async (req, res) => {
    try {
        const autores = await prisma.autor.findMany();
        res.json(autores);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar autores." });
    }
};

// Buscar autor por ID
const buscarAutorPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const autor = await prisma.autor.findUnique({ where: { id: Number(id) } });
        if (!autor) return res.status(404).json({ erro: "Autor não encontrado." });
        res.json(autor);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar o autor." });
    }
};

// Criar um novo autor
const criarAutor = async (req, res) => {
    const { nome, data_nascimento, nacionalidade } = req.body;
    try {
        const novoAutor = await prisma.autor.create({
            data: { nome, data_nascimento: new Date(data_nascimento), nacionalidade }
        });
        res.status(201).json(novoAutor);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao criar autor." });
    }
};

// Atualizar um autor existente
const atualizarAutor = async (req, res) => {
    const { id } = req.params;
    const { nome, data_nascimento, nacionalidade } = req.body;
    try {
        const autorAtualizado = await prisma.autor.update({
            where: { id: Number(id) },
            data: { nome, data_nascimento: new Date(data_nascimento), nacionalidade }
        });
        res.json(autorAtualizado);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao atualizar autor." });
    }
};

// Excluir um autor
const excluirAutor = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.autor.delete({ where: { id: Number(id) } });
        res.json({ mensagem: "Autor excluído com sucesso." });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao excluir autor." });
    }
};

module.exports = { listarAutores, buscarAutorPorId, criarAutor, atualizarAutor, excluirAutor };
