import { Alert, Button } from 'reactstrap';

function FinDeJuego({ ganaste, mensajeExito, alReiniciar }) {
  return (
    {ganaste ? '¡Felicidades, lo lograste!' : '¡Se acabó el tiempo!'}
    {ganaste ? mensajeExito : 'El tiempo para la misión terminó. Reinicia para empezar de nuevo.'}
    Reiniciar
  );
}

export default FinDeJuego;