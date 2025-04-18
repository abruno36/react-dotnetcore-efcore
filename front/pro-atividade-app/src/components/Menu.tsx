import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';

const Menu: React.FC = () => {
    const getActiveRoute = useLocation().pathname ? 'Active' : '';

    return (
        <Navbar bg="dark" variant="dark" expand='lg'>
            <Container>
                <Navbar.Brand as={NavLink} to='/'>
                    Ativy
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='me-auto'>
                        <Nav.Link
                            className={getActiveRoute}
                            as={NavLink}
                            to='/clientes'
                        >
                            Clientes
                        </Nav.Link>
                        <Nav.Link
                            className={getActiveRoute}
                            as={NavLink}
                            to='/atividades'
                        >
                            Atividades
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        <NavDropdown
                            align='end'
                            title='Bruno'
                            id='basic-nav-dropdown'
                        >
                            <NavDropdown.Item href='#action/3.1'>
                                Perfil
                            </NavDropdown.Item>
                            <NavDropdown.Item href='#action/3.3'>
                                Configurações
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href='#action/3.4'>
                                Sair
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Menu;
