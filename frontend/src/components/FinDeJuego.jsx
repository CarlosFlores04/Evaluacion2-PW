import { Alert, Button } from 'reactstrap';

function FinDeJuego({ ganaste, mensajeExito, alReiniciar }) {
  return (
    <Alert color={ganaste ? 'success' : 'danger'} fade={false} className="fin-juego">
      <h4>{ganaste ? '¡Felicidades, lo lograste!' : '¡Se acabó el tiempo!'}</h4>
      <p>{ganaste ? mensajeExito : 'El tiempo para la misión terminó. Reinicia para empezar de nuevo.'}</p>
      <Button color="primary" onClick={alReiniciar}>
        Reiniciar
      </Button>
    </Alert>
  );
}

export default FinDeJuego;