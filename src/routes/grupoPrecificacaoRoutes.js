const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

router.get('/grupo-precificacao', async (req, res) => {
    const grupos = await prisma.grupoPrecificacao.findMany();
    res.json(grupos);
  });
  
  router.post('/grupo-precificacao', async (req, res) => {
    const grupo = await prisma.grupoPrecificacao.create({ data: req.body });
    res.json(grupo);
  });

  module.exports = router;
