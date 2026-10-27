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
  alCambiar,
  alDesembarcar,

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
    <Card>
      <CardBody>
        <CardTitle tag="h5">Tu Bodega de Carga</CardTitle>
        {calculando && (
          <div className="mb-2">
            <Spinner size="sm" /> Calculando peso...
          </div>
        )}
        {filas.length === 0 ? (
          <p>La bodega está vacía.</p>
        ) : (
          <ListGroup className="mb-3">
            {filas.map((fila) => (
              <ListGroupItem key={fila.id}>
                <div className="d-flex justify-content-between">
                  <strong>{fila.nombre}</strong>
                  <span>{fila.precio * fila.cantidad} Cr</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <ButtonGroup size="sm">
                    <Button
                      outline
                      disabled={bloqueado || calculando || fila.cantidad <= 1}
                      onClick={() => alCambiar(fila.id, fila.cantidad - 1)}
                    >
                      -
                    </Button>
                    <Button outline disabled>
                      {fila.cantidad}
                    </Button>
                    <Button
                      outline
                      disabled={bloqueado || calculando}
                      onClick={() => alCambiar(fila.id, fila.cantidad + 1)}
                    >
                      +
                    </Button>
                  </ButtonGroup>
                  <Button
                    color="danger"
                    outline
                    size="sm"
                    disabled={bloqueado || calculando}
                    onClick={() => alDesembarcar(fila.id)}
                  >
                    Desembarcar
                  </Button>
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </CardBody>
    </Card>
  );
}

export default Bodega;