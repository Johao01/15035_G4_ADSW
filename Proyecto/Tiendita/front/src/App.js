import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import RegistroCliente from "./pages/registro-cliente.js";
import RegistroProductos from "./pages/registro-productos";
import RegistroProveedor from "./pages/registro-proveedor.js";
import RegistroFactura from "./pages/registro-factura.js";
import Impresion from "./pages/Impresion.js";
import InformeVentas from "./pages/InformeVentas.js";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Header from "./navegacion/Header";
import Footer from "./navegacion/Footer";
import "./css/bootstrap.css";
import "./css/style.css";
import "./css/responsive.css";
import Factura from "./pages/Facturacion.js";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Verificamos si el usuario ya está logueado al cargar la página
  useEffect(() => {
    const loggedInUser = localStorage.getItem("isLoggedIn");
    if (loggedInUser === "true") {
      setIsLoggedIn(true);
    }
  }, []);
  const handleLogin = () => {
    setIsLoggedIn(true);
    // Almacenamos el estado de login en el almacenamiento local del navegador
    localStorage.setItem("isLoggedIn", "true");
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    // Limpiamos el estado de login del almacenamiento local del navegador al hacer logout
    localStorage.removeItem("isLoggedIn");
  };
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {isLoggedIn ? (
          // Si el usuario está logueado, redireccionamos a la ventana Home
          <Route path="/" element={<Home onLogout={handleLogout} />} />
        ) : (
          // Si no está logueado, mostramos la ventana de Login
          <Route path="/" element={<Login onLogin={handleLogin} />} />
        )}
        <Route path="/registro-productos" element={<RegistroProductos />} />
        <Route path="/registro-clientes" element={<RegistroCliente />} />
        <Route path="/registro-proveedor" element={<RegistroProveedor />} />
        <Route path="/registro-factura" element={<RegistroFactura />} />
        <Route path="/facturacion" element={<Factura />} />
        <Route path="/impresion" element={<Impresion />} />
        <Route path="/informe-ventas" element={<InformeVentas />} />
        <Route path="/home" element={<Outlet />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
