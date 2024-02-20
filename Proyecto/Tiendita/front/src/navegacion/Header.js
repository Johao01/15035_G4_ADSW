import React from 'react';
import { Link } from 'react-router-dom';
import Validacion from './Validacion'
const Header = () => {
  return (
    <header className="header_section">
      <div className="container">
        <nav className="navbar navbar-expand-lg custom_nav-container pt-3">
          <Link to="/home" className="navbar-brand">
            <img src="images/logo.png" alt="" /><span>
              Tiendita
            </span>
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="d-flex ml-auto flex-column flex-lg-row align-items-center">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/home" className="nav-link">Inicio</Link>
                </li>
                <li className="nav-item">
                  
                  <Validacion/>
                </li>
              </ul>
             
            </div>
            
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
