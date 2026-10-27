const express = require('express');
const controlador = require('../controllers/misionController');

const router = express.Router();

router.get('/inventario', controlador.listarInventario);
router.get('/carga', controlador.verCarga);
router.post('/carga/agregar', controlador.agregar);
router.put('/carga/actualizar-unidades/:id', controlador.actualizar);
router.delete('/carga/eliminar/:id', controlador.eliminar);

module.exports = router;