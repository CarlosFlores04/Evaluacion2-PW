import { useState } from 'react';
import { Container, Nav, NavItem, NavLink, Navbar, NavbarBrand } from 'reactstrap';
import Reactor from './components/Reactor';
import Mision from './components/mision/Mision';

function App() {
  const [vista, setVista] = useState('reactor');

  return (
    <>
      <Navbar className="barra mb-4">
        <Container>
          <NavbarBrand>Evaluación II · Programación Web</NavbarBrand>
        </Container>
      </Navbar>
      <Container className="pb-5">
        <Nav pills className="mb-4">
          <NavItem>
            <NavLink
              tag="button"
              type="button"
              active={vista === 'reactor'}
              onClick={() => setVista('reactor')}
            >
              Ejercicio 1 · Reactor
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              tag="button"
              type="button"
              active={vista === 'mision'}
              onClick={() => setVista('mision')}
            >
              Ejercicio 2 · AstroLogistics
            </NavLink>
          </NavItem>
        </Nav>
        {vista === 'reactor' ? <Reactor /> : <Mision />}
      </Container>
    </>
  );
}

export default App;