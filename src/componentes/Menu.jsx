import { NavLink, Outlet } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Menu() {
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    {}
                    <Navbar.Brand as={NavLink} to="/">Controle de Gastos</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {}
                            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                            <NavDropdown title="Cadastros" id="basic-nav-dropdown">
                                
                                {}
                                <NavDropdown.Item as={NavLink} to="categorias">
                                    Categorias
                                </NavDropdown.Item>
                                <NavDropdown.Item as={NavLink} to="transacoes">
                                    Transações
                                </NavDropdown.Item>
                                <NavDropdown.Item as={NavLink} to="metas">
                                    Metas
                                </NavDropdown.Item>

                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            
            {}
            <Outlet /> 
        </>
    );
}

export default Menu;
