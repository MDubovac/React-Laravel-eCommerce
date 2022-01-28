import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';

function Header() {

    const navigate = useNavigate();

    const logoutSubmit = (e) => {
        e.preventDefault();
        
        axios.post(`/api/logout`).then(res => {
            if (res.data.status === 200)
            {
                localStorage.clear();
                swal({
                    title: "Success!",
                    text: "You have logged out successfully!",
                    icon: "success",
                });
                navigate('/');
            }
        })

    }

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">

                        <Nav className="me-auto">
                            <Link to="/">Home</Link>
                            <Link to="/collections">Collections</Link>
                        </Nav>

                        <Nav>
                            {
                                localStorage.getItem('auth_token') ?
                                <>
                                    <Button onClick={logoutSubmit} className="btn btn-danger">Logout</Button>
                                </>
                                :
                                <> 
                                    <Link to="/login">Login</Link>
                                    <Link to="/register">Register</Link>
                                </>
                            }
                           
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;
