const express = require('express');
const controlador = require('../controllers/misionController');
const router = express.Router();
router.get('/inventario', controlador.listarInventario);
router.get('/carga', controlador.verCarga);
router.post('/carga/agregar', controlador.agregar);
module.exports = router;
