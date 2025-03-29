const express = require('express');
const { verificarLogin } = require('../controllers/loginController');

const router = express.Router();

router.get('/:email', verificarLogin);

module.exports = router;
