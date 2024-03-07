import React, { useState, useEffect } from "react";
import "../css/validacion.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const URI = "http://localhost:5000/alert/";

class Observable {
  constructor() {
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notifyObservers(data) {
    this.observers.forEach(observer => observer.update(data));
  }
}

class ProductosObservable extends Observable {
  constructor() {
    super();
    this.productos = [];
  }

  setProductos(productos) {
    this.productos = productos;
    this.notifyObservers(productos);
  }
}

function Validacion() {
  const navigate = useNavigate();
  const [alert, setAlert] = useState([]);
  const username = localStorage.getItem("username");

  useEffect(() => {
    const productosObservable = new ProductosObservable();

    const getAlert = async () => {
      const res = await axios.get(URI);
      const productos = res.data;
      setAlert(productos);
      productosObservable.setProductos(productos);
    };

    getAlert();

    const interval = setInterval(() => {
      getAlert();
    }, 5000); // Actualizar cada 5 segundos

    productosObservable.addObserver({
      update: productos => {
        setAlert(productos);
      }
    });

    return () => {
      clearInterval(interval);
      productosObservable.removeObserver();
    };
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("username");
    window.alert("Se cerró la sesión");
    navigate("/");
  };

  if (!username) {
    return null; // Si no hay usuario autenticado, no renderizamos el componente
  }

  return (
    <div>
      <div className="nav">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="d-flex ml-auto flex-column flex-lg-row align-items-center">
            <ul className="navbar-nav">
              {username == null ? (
                <button style={{ backgroundColor: "white", border: "none", color: "darkblue", marginTop: "7px" }}>
                  <a className="nav-a" href="/" style={{ color: "black", marginTop: "" }}>
                    Login
                  </a>
                </button>
              ) : (
                <li className="dropdown">
                  <div className="dropdown"></div>
                  <button className="btn-sal" style={{ backgroundColor: "white", border: "none", color: "darkblue", marginTop: "7px" }}>{username + "     "}</button>
                  <div className="dropdown-content" style={{ textAlign: "left" }}>
                    <button className="btnValidacion" onClick={cerrarSesion}>
                      <Link to="/" className="l" id="reload">
                        SALIR
                      </Link>
                    </button>
                  </div>
                </li>
              )}
              <li className="nav-item">
                <Link to="/facturacion" className="nav-link">
                  Facturacion
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/registro-clientes" className="nav-link" data-testid="test-linkcl">
                  Clientes
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/registro-productos" className="nav-link">
                  Productos
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/registro-proveedor" className="nav-link">
                  Proveedores
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/registro-factura" className="nav-link">
                  Facturas
                </Link>
              </li>
              <li className="nav-alert">
                <a href="#" className="nav-link">
                  <div className="alerta">
                    <div className="contador"><p>{alert.length}</p></div>
                    <i className="fa fa-bell" aria-hidden="true"></i>
                  </div>
                </a>
                <div className="sub">
                  <ul className="submenu">
                    <li>ESTOS PRODUCTOS ESTAN POR TERMINARSE!!</li>
                    {alert.map((pro, index) => (
                      <li key={index}><i className="fa fa-check-circle" aria-hidden="true"></i>{" " + pro.PRO_NOMBRE + " " + pro.PRO_DESCRIPCION + " quedan " + pro.PRO_STOCK + " unidades"}</li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Validacion;
