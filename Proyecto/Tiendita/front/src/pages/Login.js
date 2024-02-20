import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const Login = () => {
  useEffect(() => {
    document.title = "LOGIN"
    
});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();

    

    if (username === "admin" && password === "password") {
      setIsLoggedIn(true);
      localStorage.setItem("username",username)
    } else {
      alert("Credenciales incorrectas. Inténtalo de nuevo.");
    }
  };

  if (isLoggedIn) {
    // Si el usuario ha iniciado sesión, utiliza Navigate para redirigir a /registro-cliente
    return <Navigate to="/home" />;
  } else {
    // Si el usuario aún no ha iniciado sesión, muestra el formulario de inicio de sesión
    return (
      <div style={{ marginTop:"45px",display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "55px" }}>
        <h2>TIENDITA</h2>
        <h2>LOGIN</h2>
        <form
          onSubmit={handleLogin}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "300px",
            margin: "20px 0",
            padding: "40px",
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.9)"
          }}
        >
          <label>Usuario:</label>
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Ingrese el usuario"
            style={{
              textAlign: "center",
              padding: "7px 10px",
              borderRadius: "5px",
              marginTop: "10px",
              marginBottom: "10px",
              
            }}
            onChange={handleInputChange}
            required
          />

          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            placeholder="Ingrese la contraseña"
            style={{
              textAlign: "center",
              padding: "7px 10px",
              borderRadius: "5px",
              marginTop: "7px",
              marginBottom: "10px",
              
            }}
            value={password}
            onChange={handleInputChange}
            required
          />

          <button
            type="submit"
            className="custom-button"
            style={{
              
              padding: "10px 20px",
              borderRadius: "5px",
              marginTop: "10px",
            }}
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    );
  }
};

export default Login;
