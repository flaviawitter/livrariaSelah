const prisma = require('../config/prismaClient');

async function criarCartao(req, res) {
    try {
        const cartaoReq = req.body
        const data = {
            apelidoCartao: cartaoReq.apelidoCartao,
            nomeTitular: cartaoReq.nomeTitular,
            numero: cartaoReq.numero,
            validade: cartaoReq.validade,
            codSeguranca: cartaoReq.codSeguranca,
            bandeiraCartao: cartaoReq.bandeiraCartao,
            preferencial: cartaoReq.preferencial,
            clienteId: cartaoReq.clienteId
        }
        const novoCartao = await prisma.cartao.create({ data });
        res.status(201).json(novoCartao);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function criarCartaoNovo(req, res) {
    const { idCliente } = req.params;  
    const cartao = req.body.cartao;  
    try {
        const novoCartao = await prisma.cartao.create({
            data: { ...cartao, clienteId: parseInt(idCliente) },
        });
        res.status(201).json({ message: "Cartão criado com sucesso", novoCartao });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function listarCartoes(req, res) {
    try {
        const cartoes = await prisma.cartao.findMany();
        res.json(cartoes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function obterCartao(req, res) {
    try {
        const cartao = await prisma.cartao.findUnique({
            where: { id: parseInt(req.params.id) },
            include: {
                bandeiraCartao: {
                    select: { descricao: true }
                }
            }
        });
        if (!cartao) return res.status(404).json({ message: "Cartão não encontrado" });
        res.json(cartao);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function atualizarCartao(req, res) {
    const id = req.params.id;
    const body = req.body;
    try {
        const cartao = await prisma.cartao.updateMany({ 
            where: { clienteId: parseInt(id) }, 
            data: body
         });
        res.json(cartao);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function deletarCartao(req, res) {
    
    try {
        await prisma.cartao.deleteMany({ where: { clienteId: parseInt(req.params.id) } });
        res.json({ message: "Cartão deletado com sucesso" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { criarCartao, listarCartoes, obterCartao, atualizarCartao, deletarCartao, criarCartaoNovo };