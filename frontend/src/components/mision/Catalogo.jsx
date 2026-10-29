import { Badge, Button, Card, CardBody, CardSubtitle, CardTitle, Col, Row } from 'reactstrap';

function Catalogo({ inventario, bloqueado, calculando, alAgregar }) {
  return (
    <Row>
      {inventario.map((equipo) => (
        <Col md="4" xs="12" key={equipo.id}>
          <Card className="mb-3">
            <CardBody>
              <CardTitle tag="h5">{equipo.nombre}</CardTitle>
              <CardSubtitle className="mb-2 text-muted">{equipo.categoria}</CardSubtitle>
              <p className="mb-1">
                <Badge color="success">{equipo.precio} Cr</Badge>
              </p>
              <p>Stock disponible: {equipo.stock}</p>
              {equipo.stock === 0 ? (
                <Button color="secondary" disabled>
                  Agotado en Base
                </Button>
              ) : (
                <Button
                  color="primary"
                  disabled={bloqueado || calculando}
                  onClick={() => alAgregar(equipo.id)}
                >
                  Añadir a la Nave
                </Button>
              )}
            </CardBody>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default Catalogo;
