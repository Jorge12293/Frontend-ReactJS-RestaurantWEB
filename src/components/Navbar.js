import React,{useEffect,useState} from "react";
import {Link,NavLink,useLocation } from 'react-router-dom';


const Navbar = () => {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">WR</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <NavLink
                        className={({ isActive }) => isActive? "nav-link active": 'nav-link'}
                        to="/pos">POS
                    </NavLink>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
                      ORDENES
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <NavLink
                            className={({ isActive }) => isActive? "dropdown-item active": 'dropdown-item'}
                            to="/orden">LISTA DE ORDENES 
                        </NavLink>
                    </div>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
                      AREAS
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <NavLink
                            className={({ isActive }) => isActive? "dropdown-item active": 'dropdown-item'}
                            to="/area">AREAS
                        </NavLink>
                        <NavLink
                            className={({ isActive }) => isActive? "dropdown-item active": 'dropdown-item'}
                            to="/mesa">MESAS
                        </NavLink>
                    </div>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
                      PRODUCTOS
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <NavLink
                            className={({ isActive }) => isActive? "dropdown-item active": 'dropdown-item'}
                            to="/categoria">CATEGORIAS
                        </NavLink>
                        <NavLink
                            className={({ isActive }) => isActive? "dropdown-item active": 'dropdown-item'}
                            to="/producto">PRODUCTOS
                        </NavLink>
                        {/*
                        <NavLink
                            className={({ isActive }) => isActive? "dropdown-item active": 'dropdown-item'}
                            to="/tomafisica">TOMA FISICA
                        </NavLink>
                        */}
                    </div>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
                      CLIENTES
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <NavLink
                            className={({ isActive }) => isActive? "dropdown-item active": 'dropdown-item'}
                            to="/persona">CLIENTES
                        </NavLink>
                    </div>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
                      REPORTES
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <NavLink
                            className={({ isActive }) => isActive? "dropdown-item active": 'dropdown-item'}
                            to="/barra">Barra
                        </NavLink>
                        <NavLink
                            className={({ isActive }) => isActive? "dropdown-item active": 'dropdown-item'}
                            to="/anillo">ANILLO
                        </NavLink>
                        <NavLink
                            className={({ isActive }) => isActive? "dropdown-item active": 'dropdown-item'}
                            to="/linea">LINEA
                        </NavLink>
                    </div>
                </li>
                </ul>               
                <form className="form-inline my-2 my-lg-0">
                   <button className="btn btn-danger my-2 my-sm-0" type="submit">Salir</button>
                </form>
            </div>
        </nav>
    )
}

export default Navbar;