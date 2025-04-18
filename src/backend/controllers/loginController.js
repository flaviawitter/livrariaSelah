    const prisma = require('../config/prismaClient');
    const bcrypt = require('bcryptjs');

    async function verificarLogin(req, res) {
        const { email, senha } = req.body; // Alterado para receber via body

        try {
            const usuario = await prisma.cliente.findFirst({
                where: { email: email },
                include: { 
                    telefones: true,
                    enderecos: true,
                    cartoes: true 
                } 
            });

            if (!usuario) {
                return res.status(404).json({ mensagem: "Usuário não encontrado" });
            }

            // Comparar a senha fornecida com a senha armazenada no banco
            const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
            if (!senhaCorreta) {
                return res.status(401).json({ mensagem: "Senha incorreta" });
            }

            res.json({ mensagem: "Login bem-sucedido", usuario });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    module.exports = { verificarLogin };


    /*  const usuario = await buscarUsuarioPorEmail(email);
        if (!usuario) {
            return res.status(401).json({ mensagem: "Usuário ou senha inválidos" });
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
        if (!senhaCorreta) {
            return res.status(401).json({ mensagem: "Usuário ou senha inválidos" });
        }

        res.status(200).json({ mensagem: "Login realizado com sucesso" });*/
