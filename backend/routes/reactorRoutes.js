const express = require('express');
const controlador = require('../controllers/reactorController');

const router = express.Router();

router.get('/reactor/estado', controlador.estado);
router.post('/adjust', controlador.ajustar);
router.post('/reboot', controlador.reiniciar);

module.exports = router;