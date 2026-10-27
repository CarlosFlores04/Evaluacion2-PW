import { useEffect, useState } from 'react';
import { Col, Row, UncontrolledAlert } from 'reactstrap';
import {
  actualizarUnidades,
  agregarEquipo,
  confirmarCarga,
  eliminarEquipo,
  obtenerCarga,
  obtenerInventario,
  reiniciarMision,
} from '../../api/misionApi';
import InfoMision from './InfoMision';
import Catalogo from './Catalogo';
import Bodega from './Bodega';
import Temporizador from '../Temporizador';
import FinDeJuego from '../FinDeJuego';

function Mision() {
  const [inventario, setInventario] = useState([]);
  const [carga, setCarga] = useState({
    creditos: 0,
    itemsCargados: [],
    total: 0,
    disponibles: 0,
    tiempoRestante: 0,
  });
  const [error, setError] = useState(null);
  const [calculando, setCalculando] = useState(false);

  const terminado = carga.confirmada || carga.expirada;

  function mostrarError(texto) {
    setError({ id: Date.now(), texto });
  }

  async function cargarDatos() {
    try {
      const [listaInventario, datosCarga] = await Promise.all([obtenerInventario(), obtenerCarga()]);
      setInventario(listaInventario);
      setCarga(datosCarga);
    } catch (err) {
      mostrarError(err.message);
    }
  }

  useEffect(() => {
    cargarDatos();
  }, []);

  async function ejecutar(accion) {
    setCalculando(true);
    setError(null);

    try {
      await accion();
    } catch (err) {
      mostrarError(err.message);
    } finally {
      await cargarDatos();
      setCalculando(false);
    }
  }

  function agregarALaNave(equipoId) {
    ejecutar(() => agregarEquipo(equipoId, 1));
  }

  function cambiarUnidades(id, nuevaCantidad) {
    ejecutar(() => actualizarUnidades(id, nuevaCantidad));
  }

  function desembarcar(id) {
    ejecutar(() => eliminarEquipo(id));
  }

  function confirmar() {
    ejecutar(() => confirmarCarga());
  }

  function reiniciar() {
    ejecutar(() => reiniciarMision());
  }

  return (
    0} alTerminar={cargarDatos}
    {terminado && ( )}
    {error && ( {error.texto} )}
    Catálogo de la Base
  );
}

export default Mision;