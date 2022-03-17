import React, {Component } from 'react';
import { NavLink } from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';

export class Navigation extends Component{
    render() {
        const isLoggedIn = sessionStorage.getItem("login");
        function Logout() {
            window.sessionStorage.clear();
            window.location.href = '/login';
          }
          
        return (
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <NavLink className="d-inline p-2 text-white" style={{marginLeft:'30px', textDecoration:'none'}} to="/">Home</NavLink>
                        {(isLoggedIn ? <NavLink className="d-inline p-2 text-white" to="/login" style={{ textDecoration:'none'}} onClick={Logout}>Logout</NavLink> : <NavLink className="d-inline p-2 text-white" style={{textDecoration:'none'}} to="/login">Login</NavLink>)}
                    </Nav>
                    </Navbar.Collapse>
                </Navbar>
        )
    }
}
