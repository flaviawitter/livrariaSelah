const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Listar todos os cupons
const listarCupons = async (req, res) => {
    try {
        const cupons = await prisma.cupom.findMany({
            include: {
                cliente: true
            }
        });
        res.json(cupons);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar cupons." });
    }
};

// Buscar cupom por ID
const buscarCupomPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const cupom = await prisma.cupom.findUnique({
            where: { id: Number(id) },
            include: {
                cliente: true
            }
        });
        if (!cupom) return res.status(404).json({ erro: "Cupom não encontrado." });
        res.json(cupom);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar o cupom." });
    }
};

// Criar um novo cupom
const criarCupom = async (req, res) => {
    const { descricao, clienteId, validade, pedidoId, valor } = req.body; 
    console.log(req.body);
    try {
      const novoCupom = await prisma.cupom.create({
        data: {
          descricao,
          clienteId: Number(clienteId),
          validade,
          pedidoId: Number(pedidoId),
          valor: Number(valor) 
        }
      });
      res.status(201).json(novoCupom);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao criar cupom." });
    }
};

  

// Atualizar um cupom existente
const atualizarCupom = async (req, res) => {
    const { id } = req.params;
    const { validade } = req.body;

    if (typeof validade !== 'boolean') {
        return res.status(400).json({ erro: "O campo 'validade' deve ser um booleano." });
    }

    try {
        const cupomAtualizado = await prisma.cupom.update({
            where: { id: Number(id) },
            data: {
                validade: validade
            }
        });
        res.json(cupomAtualizado);
    } catch (error) {
        console.error("Erro ao atualizar cupom:", error);
        res.status(500).json({ erro: "Erro ao atualizar validade do cupom." });
    }
};


// Remover um cupom
const excluirCupom = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.cupom.delete({ where: { id: Number(id) } });
        res.json({ mensagem: "Cupom excluído com sucesso." });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao excluir cupom." });
    }
};

// Buscar cupons por cliente
const listarCuponsPorCliente = async (req, res) => {
    const { idCliente } = req.params;
    try {
        // Buscar cupons com o clienteId
        const cupons = await prisma.cupom.findMany({
            where: {
                clienteId: parseInt(idCliente),  // Aqui você usa apenas o clienteId
            },
        });

        if (cupons.length === 0) {
            return res.status(404).json({ erro: "Nenhum cupom encontrado para esse cliente." });
        }

        // Retorna apenas os cupons sem o relacionamento cliente
        res.json(cupons);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao buscar cupons por cliente." });
    }
};

// Criar um pedidoCupom (associar cupom a pedido)
const criarPedidoCupom = async (req, res) => {
    const { pedidoId, cupomId } = req.body;
    try {
        const novoPedidoCupom = await prisma.pedidoCupom.create({
            data: {
                pedidoId,
                cupomId
            }
        });
        res.status(201).json(novoPedidoCupom);
    } catch (error) {
        console.error("Erro ao criar pedidoCupom:", error);
        res.status(500).json({ erro: "Erro ao criar associação entre pedido e cupom." });
    }
};


module.exports = { listarCupons, buscarCupomPorId, criarCupom, atualizarCupom, excluirCupom, listarCuponsPorCliente, criarPedidoCupom };
