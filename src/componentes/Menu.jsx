import { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import AutenticacaoContext from './telas/login/AutenticacaoContext';

function Menu() {
    const { usuario, logout } = useContext(AutenticacaoContext);

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand as={NavLink} to="/">Controle de Gastos</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                            
                            {}
                            {usuario && (
                                <NavDropdown title="Cadastros" id="basic-nav-dropdown">
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
                            )}
                        </Nav>
                        
                        {}
                        <Nav>
                            {usuario ? (
                                <NavDropdown title={`👤 ${usuario.nome}`} id="usuario-nav-dropdown" align="end">
                                    
                                    {}
                                    <NavDropdown.Item as={NavLink} to="meus-dados">
                                        Meus Dados <i className="bi bi-person-gear"></i>
                                    </NavDropdown.Item>
                                    
                                    <NavDropdown.Divider />
                                    
                                    {}
                                    <NavDropdown.Item onClick={logout}>
                                        Sair <i className="bi bi-box-arrow-right"></i>
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <Nav.Link>Login</Nav.Link>
                            )}
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
            
            <Outlet /> 
        </>
    );
}

export default Menu;