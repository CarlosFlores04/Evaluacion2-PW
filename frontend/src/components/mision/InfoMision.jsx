import { Alert, Badge } from 'reactstrap';

function InfoMision({ creditos, disponibles, total }) {
  return (
    <Alert color="info" fade={false} className="d-flex justify-content-between align-items-center flex-wrap">
      <div>
        <strong>Créditos disponibles: {disponibles} Cr</strong>
        <div className="small">Presupuesto de la misión: {creditos} Cr</div>
      </div>
      <div>
        Costo total de Carga:{' '}
        <Badge color="dark" pill>
          {total} Cr
        </Badge>
      </div>
    </Alert>
  );
}

export default InfoMision;
