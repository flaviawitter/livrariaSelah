const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

router.get('/motivo-inativacao', async (req, res) => {
    const motivos = await prisma.motivoInativacao.findMany();
    res.json(motivos);
  });
  
  router.post('/motivo-inativacao', async (req, res) => {
    const motivo = await prisma.motivoInativacao.create({ data: req.body });
    res.json(motivo);
  });

  module.exports = router;
