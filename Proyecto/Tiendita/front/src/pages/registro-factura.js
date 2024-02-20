import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegistroFactura = () => {
  const navegate = useNavigate();

  // Estado para almacenar el mes seleccionado por el usuario
  const [mes, setMes] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFinal, setFechaFinal] = useState("");
  // Estado para almacenar el número de factura ingresado por el usuario
  const [numeroFactura, setNumeroFactura] = useState("");

  // Estado para almacenar los resultados de la búsqueda
  const [resultadosBusqueda, setResultadosBusqueda] = useState([]);

  // Función para obtener todas las facturas de la API
  const obtenerFacturas = async () => {
    try {
      const response = await axios.get("http://localhost:5000/facturas");
      setResultadosBusqueda(response.data);
    } catch (error) {
      console.error("Error al obtener facturas:", error);
    }
  };

  // Llamar a la función para obtener las facturas cuando el componente se monte
  useEffect(() => {
    document.title = "FACTURAS";
    obtenerFacturas();
  }, []);

  // Función para manejar el cambio en el campo de mes
  const handleMesChange = (event) => {
    setMes(event.target.value);
    setNumeroFactura("");
    obtenerFacturas();
  };

  // Función para manejar el cambio en el campo de número de factura
  const handleNumeroFacturaChange = (event) => {
    setMes("");
    setNumeroFactura(event.target.value);
    obtenerFacturas();
  };

  // Función para manejar la búsqueda de facturas
  const handleBuscarFactura = () => {
    // Lógica para buscar en la base de datos
    const resultados = resultadosBusqueda.filter((factura) => {
      // Buscar por mes
      const fecha = new Date(factura.FAC_FECHA);
      if (mes !== "") {
        return fecha.getMonth() + 1 === parseInt(mes);
      }
      // Buscar por número de factura
      return (
        typeof factura.FAC_ID === "number" &&
        factura.FAC_ID.toString().includes(numeroFactura)
      );
    });

    // Actualizar el estado con los resultados obtenidos
    setResultadosBusqueda(resultados);
  };

  // Función para manejar el clic en una fila de la tabla de resultados
  const handleRowClick = (id) => {
    localStorage.setItem("idFactura", id);
    navegate("/impresion");
  };

  // Función para formatear la fecha en formato "YYYY-MM-DD"
  const formatearFecha = (fecha) => {
    const fechaObj = new Date(fecha);
    const year = fechaObj.getFullYear();
    const month = String(fechaObj.getMonth() + 1).padStart(2, "0");
    const day = String(fechaObj.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const rangoFecha = () => {
    if (fechaInicio === "" || fechaFinal === "") {
      alert("Debe ingresar las fechas");
      return;
    }

    const fechaInicioObj = new Date(fechaInicio);
    const fechaFinalObj = new Date(fechaFinal);

    if (isNaN(fechaInicioObj) || isNaN(fechaFinalObj)) {
      alert("Fechas inválidas");
      return;
    }

    if (fechaInicioObj > fechaFinalObj) {
      alert("La fecha de inicio no puede ser mayor a la fecha final");
      setFechaInicio("");
      setFechaFinal("");
      return;
    }

    localStorage.setItem("inicio", fechaInicio);
    localStorage.setItem("final", fechaFinal);
    navegate("/informe-ventas");
  };

  return (
    <div className="container" style={{ textAlign: "center" }}>
      <div
        style={{ textAlign: "center", marginTop: "25px", marginBottom: "25px" }}
      >
        <h1>FACTURAS</h1>
      </div>
      <div>
        <select className="combobox" value={mes} onChange={handleMesChange}>
          <option value="">Seleccione un Mes</option>
          {/* Opciones de enero a diciembre */}
          <option value="1">Enero</option>
          <option value="2">Febrero</option>
          <option value="3">Marzo</option>
          <option value="4">Abril</option>
          <option value="5">Mayo</option>
          <option value="6">Junio</option>
          <option value="7">Julio</option>
          <option value="8">Agosto</option>
          <option value="9">Septiembre</option>
          <option value="10">Octubre</option>
          <option value="11">Noviembre</option>
          <option value="12">Diciembre</option>
        </select>
        <p>O</p>
        <p>Seleccione un Rango de Fecha:</p>
        <p>
          De:{" "}
          <input
            type="date"
            min="2023-01-01"
            max="2023-08-22"
            onChange={(e) => setFechaInicio(e.target.value)}
          ></input>
          {"    "}
          Hasta:{" "}
          <input
            type="date"
            onChange={(e) => setFechaFinal(e.target.value)}
            min="2023-01-01"
            max="2023-08-24"
          ></input>
        </p>
        <button className="custom-button" onClick={(e) => rangoFecha()}>
          Informe de Ventas
        </button>
      </div>

      <br />
      <h4>Número de Factura:</h4>

      <input
        type="number" // Cambiar el tipo de entrada a "number"
        value={numeroFactura}
        onChange={handleNumeroFacturaChange}
        placeholder="Ingrese Número de Factura"
      />
      <button
        className="custom-button"
        onClick={handleBuscarFactura}
        style={{
          textAlign: "center",
          marginLeft: "8px",
          padding: "3px 10px",
          marginBottom: "25px",
        }}
      >
        BUSCAR
      </button>
      {/* Renderizar la tabla solo si hay resultados */}
      {resultadosBusqueda.length > 0 && (
        <table
          className="centrar-tabla"
          style={{
            width: "60%",
            margin: "0 auto",
          }}
        >
          <thead>
            <tr>
              <th>Número de Factura</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Método de Pago</th>
              <th>IMPRIMIR</th>
            </tr>
          </thead>
          <tbody>
            {/* Iterar sobre los resultados y mostrarlos en filas de la tabla */}
            {resultadosBusqueda.map((factura) => (
              <tr key={factura.FAC_ID}>
                <td>{factura.FAC_ID}</td>
                <td>{formatearFecha(factura.FAC_FECHA)}</td>
                <td>{factura.FAC_TOTAL}</td>
                <td>{factura.FAC_METODOPAGO}</td>
                <td>
                  <button
                    type="button"
                    className="custom-button"
                    onClick={(e) => handleRowClick(factura.FAC_ID)}
                  >
                    PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RegistroFactura;
