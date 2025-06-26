    const prisma = require('../config/prismaClient');

    async function criarEndereco(req, res) {
        try {
            const enderecoReq = req.body
            const data = {
                cep: enderecoReq.cep,
                logradouro: enderecoReq.logradouro,
                numero: enderecoReq.numero,
                bairro: enderecoReq.bairro,
                clienteId: enderecoReq.clienteId,
                tipoEndereco: enderecoReq.tipoEndereco,
                tipoLogradouro: enderecoReq.tipoLogradouro,
                tipoResidencia: enderecoReq.tipoResidencia,
                cidade: enderecoReq.cidade,
                observacao: enderecoReq.observacao,
                pais: enderecoReq.pais,
                estado: enderecoReq.estado,
                preferencial: enderecoReq.preferencial
            }
            const endereco = await prisma.endereco.create({ data });
            res.status(201).json(endereco);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async function criarEnderecoNovo(req, res) {
        const { idCliente } = req.params;  
        const endereco = req.body.endereco;  
        try {
            const novoEndereco = await prisma.endereco.create({
                data: { ...endereco, clienteId: parseInt(idCliente) },
            });
            res.status(201).json({ message: "Cartão criado com sucesso", novoEndereco });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async function listarEnderecos(req, res) {
        try {
            const enderecos = await prisma.endereco.findMany();
            res.json(enderecos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async function obterEndereco(req, res) {
        try {
            const endereco = await prisma.endereco.findUnique({
                where: { id: parseInt(req.params.id) },
                include: {
                    cidade: { select: { nome: true } },
                    tipoEndereco: { select: { descricao: true } },
                    tipoLogradouro: { select: { descricao: true } },
                    tipoResidencia: { select: { descricao: true } }
                }
            });
            if (!endereco) return res.status(404).json({ message: "Endereço não encontrado" });
            res.json(endereco);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async function atualizarEndereco(req, res) {
        const id = req.params.id;
        const body = req.body;
        try {
            const endereco = await prisma.endereco.updateMany({ 
                where: { clienteId: parseInt(id),
                        tipoEndereco: body.tipoEndereco
                }, 
                data: body
            });
            res.json(endereco);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async function deletarEndereco(req, res) {
        try {
            await prisma.endereco.deleteMany({ where: { clienteId: parseInt(req.params.id) } });
            res.json({ message: "Endereço deletado com sucesso" });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    module.exports = { criarEndereco, listarEnderecos, obterEndereco, atualizarEndereco, deletarEndereco, criarEnderecoNovo };
