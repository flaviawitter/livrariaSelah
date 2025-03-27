const prisma = require('../config/prismaClient');
const bcrypt = require('bcryptjs');

async function buscarUsuarioPorEmail(email) {
    return await prisma.cliente.findUnique({
        where: { email }
    });
}

async function verificarLogin(req, res) {
    const { email, senha } = req.body;

    const usuario = await buscarUsuarioPorEmail(email);
    if (!usuario) {
        return res.status(401).json({ mensagem: "Usuário ou senha inválidos" });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
        return res.status(401).json({ mensagem: "Usuário ou senha inválidos" });
    }

    res.status(200).json({ mensagem: "Login realizado com sucesso" });
}

module.exports = { 
    verificarLogin
};
