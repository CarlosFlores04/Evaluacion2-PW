import { useEffect, useState } from 'react';
import { Badge } from 'reactstrap';

function formatear(segundos) {
  const minutos = Math.floor(segundos / 60);
  const resto = segundos % 60;
  return `${String(minutos).padStart(2, '0')}:${String(resto).padStart(2, '0')}`;
}

function Temporizador({ segundos, activo, alTerminar }) {
  const [restante, setRestante] = useState(segundos);

  useEffect(() => {
    setRestante(segundos);
  }, [segundos]);

  useEffect(() => {
    if (!activo) {
      return;
    }

    if (restante <= 0) {
      alTerminar();
      return;
    }

    const temporizador = setTimeout(() => setRestante(restante - 1), 1000);
    return () => clearTimeout(temporizador);
  }, [restante, activo]);

  return (
    Tiempo de la misión:{' '}
    {formatear(restante)}
  );
}

export default Temporizador;