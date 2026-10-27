import { useEffect, useState } from 'react';
import {
  Alert,
  Badge,
  Button,
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';
import { ajustarTemperatura, obtenerEstadoReactor, reiniciarReactor } from '../api/reactorApi';
import Temporizador from './Temporizador';
import FinDeJuego from './FinDeJuego';

function Reactor() {
  const [temperatura, setTemperatura] = useState('');
  const [historial, setHistorial] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [estabilizado, setEstabilizado] = useState(false);
  const [expirado, setExpirado] = useState(false);
  const [segundos, setSegundos] = useState(0);
  const [error, setError] = useState('');

  const terminado = estabilizado || expirado;
  const fallidos = historial.filter((intento) => intento.resultado !== 'estabilizado');

  function cargarEstado() {
    return obtenerEstadoReactor()
      .then((estado) => {
        setSegundos(estado.tiempoRestante);
        setExpirado(estado.expirado);
        setEstabilizado(estado.estabilizado);
      })
      .catch((err) => setError(err.message));
  }

  useEffect(() => {
    cargarEstado();
  }, []);

  function escribir(evento) {
    setTemperatura(evento.target.value.replace(/\D/g, ''));
  }

  function enviar(evento) {
    evento.preventDefault();
    const valor = Number(temperatura);

    if (valor < 1) {
      setError('La temperatura debe ser mayor o igual a 1');
      return;
    }

    if (valor > 100) {
      setError('La temperatura debe ser menor o igual a 100');
      return;
    }

    setError('');
    ajustarTemperatura(valor)
      .then((datos) => {
        setHistorial([...historial, { valor, resultado: datos.resultado }]);
        setMensaje(datos.mensaje);
        setTemperatura('');
      })
      .catch((err) => setError(err.message))
      .finally(cargarEstado);
  }

  function reiniciar() {
    reiniciarReactor()
      .then(() => {
        setHistorial([]);
        setMensaje('');
        setError('');
        setTemperatura('');
        return cargarEstado();
      })
      .catch((err) => setError(err.message));
  }

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h3">Estabiliza el Reactor</CardTitle>
        <p>Adivina la temperatura de estabilización, un número entre 1 y 100.</p>

        <Temporizador segundos={segundos} activo={!terminado && segundos > 0} alTerminar={cargarEstado} />

        {terminado && (
          <FinDeJuego
            ganaste={estabilizado}
            mensajeExito="El reactor quedó estabilizado."
            alReiniciar={reiniciar}
          />
        )}

        {error && <Alert color="warning" fade={false}>{error}</Alert>}
        {mensaje && !terminado && <Alert color="info" fade={false}>{mensaje}</Alert>}

        <Form onSubmit={enviar} className="d-flex gap-2 align-items-end flex-wrap">
          <FormGroup className="mb-0">
            <Label for="temperatura">Temperatura (°C)</Label>
            <Input
              id="temperatura"
              type="text"
              inputMode="numeric"
              maxLength="3"
              placeholder="1 - 100"
              value={temperatura}
              onChange={escribir}
              disabled={terminado}
            />
          </FormGroup>
          <Button color="primary" type="submit" disabled={terminado || temperatura === ''}>
            Ajustar
          </Button>
          <Button color="secondary" outline type="button" onClick={reiniciar}>
            Reiniciar
          </Button>
        </Form>

        <h5 className="mt-4">
          Historial de intentos{' '}
          <Badge color="dark" pill>
            {historial.length}
          </Badge>
        </h5>
        <p className="mb-2">Intentos fallidos: {fallidos.length}</p>

        {historial.length === 0 ? (
          <p>Aún no has ingresado temperaturas.</p>
        ) : (
          <ListGroup>
            {historial.map((intento, indice) => (
              <ListGroupItem key={indice} className="d-flex justify-content-between">
                <span>
                  Intento {indice + 1}: {intento.valor} °C
                </span>
                <Badge color={intento.resultado === 'estabilizado' ? 'success' : 'warning'}>
                  {intento.resultado === 'estabilizado'
                    ? 'Estabilizado'
                    : `La ideal es ${intento.resultado}`}
                </Badge>
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </CardBody>
    </Card>
  );
}

export default Reactor;