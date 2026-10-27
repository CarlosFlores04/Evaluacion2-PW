import { Button, ButtonGroup, Card, CardBody, CardTitle, ListGroup, ListGroupItem, Spinner } from 'reactstrap';

function Bodega({
  itemsCargados,
  inventario,
  bloqueado,
  calculando,
  confirmada,
  alCambiar,
  alDesembarcar,
  alConfirmar,
}) {
  const filas = itemsCargados.map((item) => {
    const equipo = inventario.find((e) => e.id === item.id);
    return { ...item, nombre: equipo.nombre, precio: equipo.precio };
  });

  return (
    Tu Bodega de Carga
    {calculando && (
      Calculando peso...
    )}
    {filas.length === 0 ? (
      La bodega está vacía.
    ) : (
      {filas.map((fila) => (
        {fila.nombre}
        {fila.precio * fila.cantidad} Cr
        alCambiar(fila.id, fila.cantidad - 1)}
        >
        -
        {fila.cantidad}
        alCambiar(fila.id, fila.cantidad + 1)}
        >
        +
        onClick={() => alDesembarcar(fila.id)}
        >
        Desembarcar
      ))}
    )}
    {confirmada ? 'Equipo confirmado' : 'Confirmar equipo'}
  );
}

export default Bodega;