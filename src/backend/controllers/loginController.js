const prisma = require('../config/prismaClient');
const bcrypt = require('bcryptjs');


async function verificarLogin(req, res) {
    const email = req.params.email;

    try {
        const usuario = await prisma.cliente.findFirst({
            where: { email: email}
        });

        if (!usuario) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        console.log(usuario)
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }



  /*  const usuario = await buscarUsuarioPorEmail(email);
    if (!usuario) {
        return res.status(401).json({ mensagem: "Usuário ou senha inválidos" });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
        return res.status(401).json({ mensagem: "Usuário ou senha inválidos" });
    }

    res.status(200).json({ mensagem: "Login realizado com sucesso" });*/
}

module.exports = { 
    verificarLogin
};
