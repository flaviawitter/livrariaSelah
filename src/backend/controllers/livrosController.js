const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Listar todos os livros
const listarLivros = async (req, res) => {
    try {
        const livros = await prisma.livros.findMany({
            include: {
                autores: true,
                editoras: true,
                fornecedor: true,
                categorias: true, 
                grupoprecificacao: true,
                estoque: true            }
        });
        console.log(livros)
        res.json(livros);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar livros." });
    }
};

// Buscar livro por ID
const buscarLivroPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const livros = await prisma.livros.findUnique({
            where: { id: Number(id) },
            include: {
                autores: true,  // Padronizando o nome dos relacionamentos
                editoras: true,
                fornecedor: true,
                categorias: true,
                grupoprecificacao: true
            }
        });        
        if (!livros) return res.status(404).json({ erro: "Livro não encontrado." });
        res.json(livros);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar o livro." });
    }
};

const buscarLivrosPorTermo = async (req, res) => {
    const { termo } = req.query;
    try {
        const livros = await prisma.livros.findMany({
            where: {
                titulo: {
                    contains: termo.trim(),
                }
            },
            include: {
                autores: true,
                editoras: true,
                fornecedor: true,
                categorias: true,
                grupoprecificacao: true
            }
        });

        if (livros.length === 0) {
            return res.status(404).json({ mensagem: "Nenhum livro encontrado com esse termo." });
        }

        res.json(livros);
    } catch (error) {
        console.error("Erro ao buscar livros:", error);
        res.status(500).json({ erro: "Erro ao buscar livros." });
    }
};


// Criar um novo livro
const criarLivro = async (req, res) => {
    const {
        titulo, autor_id, editora_id, fornecedor_id, categoria_id, ano, edicao,
        isbn, preco_custo, preco_venda, data_publicacao, paginas, sinopse,
        quantidade_estoque, status, altura, largura, peso, profundidade,
        grupo_precificacao_id, codigo_barras
    } = req.body;

    try {
        const novoLivro = await prisma.livro.create({
            data: {
                titulo, autor_id, editora_id, fornecedor_id, categoria_id, ano: Number(ano), edicao,
                isbn, preco_custo: Number(preco_custo), preco_venda: Number(preco_venda),
                data_publicacao: new Date(data_publicacao), paginas: Number(paginas), sinopse,
                quantidade_estoque: Number(quantidade_estoque), status, altura: Number(altura),
                largura: Number(largura), peso: Number(peso), profundidade: Number(profundidade),
                grupo_precificacao_id, codigo_barras
            }
        });
        res.status(201).json(novoLivro);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao criar livro." });
    }
};

// Atualizar um livro existente
const atualizarLivro = async (req, res) => {
    const { id } = req.params;
    const {
        titulo, autor_id, editora_id, fornecedor_id, categoria_id, ano, edicao,
        isbn, preco_custo, preco_venda, data_publicacao, paginas, sinopse,
        quantidade_estoque, status, altura, largura, peso, profundidade,
        grupo_precificacao_id, codigo_barras
    } = req.body;

    try {
        const livroAtualizado = await prisma.livro.update({
            where: { id: Number(id) },
            data: {
                titulo, autor_id, editora_id, fornecedor_id, categoria_id, ano: Number(ano), edicao,
                isbn, preco_custo: Number(preco_custo), preco_venda: Number(preco_venda),
                data_publicacao: new Date(data_publicacao), paginas: Number(paginas), sinopse,
                quantidade_estoque: Number(quantidade_estoque), status, altura: Number(altura),
                largura: Number(largura), peso: Number(peso), profundidade: Number(profundidade),
                grupo_precificacao_id, codigo_barras
            }
        });
        res.json(livroAtualizado);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao atualizar livro." });
    }
};

// Excluir um livro
const excluirLivro = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.livro.delete({ where: { id: Number(id) } });
        res.json({ mensagem: "Livro excluído com sucesso." });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao excluir livro." });
    }
};

module.exports = { listarLivros, buscarLivroPorId, buscarLivrosPorTermo, criarLivro, atualizarLivro, excluirLivro };
