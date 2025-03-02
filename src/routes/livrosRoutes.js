const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

router.get('/livros', async (req, res) => {
    const livros = await prisma.livros.findMany();
    res.json(livros);
  });
  
  router.post('/livros', async (req, res) => {
    const livro = await prisma.livros.create({ data: req.body });
    res.json(livro);
  });

  module.exports = router;
