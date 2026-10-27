import { useEffect, useState } from 'react';
import { Col, Row, UncontrolledAlert } from 'reactstrap';
import { actualizarUnidades, agregarEquipo, eliminarEquipo, obtenerCarga, obtenerInventario } from '../../api/misionApi';
import InfoMision from './InfoMision';
import Catalogo from './Catalogo';
import Bodega from './Bodega';

function Mision() {
  const [inventario, setInventario] = useState([]);
  const [carga, setCarga] = useState({ creditos: 0, itemsCargados: [], total: 0, disponibles: 0, tiempoRestante: 0 });
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

  return (
    <div>
      {error && (
        <UncontrolledAlert color="warning" key={error.id} fade={false}>
          {error.texto}
        </UncontrolledAlert>
      )}
      <InfoMision creditos={carga.creditos} disponibles={carga.disponibles} total={carga.total} />
      <Row>
        <Col lg="8">
          <h4 className="mb-3">Catálogo de la Base</h4>
          <Catalogo
            inventario={inventario}
            bloqueado={terminado}
            calculando={calculando}
            alAgregar={agregarALaNave}
          />
        </Col>
        <Col lg="4">
          <Bodega
            itemsCargados={carga.itemsCargados}
            inventario={inventario}
            bloqueado={terminado}
            calculando={calculando}
            alCambiar={cambiarUnidades}
            alDesembarcar={desembarcar}
          />
        </Col>
      </Row>
    </div>
  );
}

export default Mision;