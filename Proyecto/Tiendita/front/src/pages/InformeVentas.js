import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/InformeVentas.css";
import { useNavigate } from "react-router-dom";

const InformeVentas = () => {
  // Changed function name to start with uppercase
  const navegate = useNavigate();
  const url = "http://localhost:5000/impresionFactura/informe-ventas/";
  const [datos, setDatos] = useState([""]);
  const fechaInicio = localStorage.getItem("inicio");
  const fechaFinal = localStorage.getItem("final");

  const getTotalFactura = async (inicio, final) => {
    try {
      const res = await axios.get(url + inicio + "/" + final);
      setDatos(res.data);
      console.log(inicio);
      console.log(final);
      console.log(datos)
    } catch {
      console.log("error");
    }
  };

  useEffect(() => {
    getTotalFactura(fechaInicio, fechaFinal);
  }, []);

  return (
    <div className="informe-container">
      {datos && datos[0] ? (
        <div className="informe-container">
          <div className="informe-content">
            <h1 className="informe-heading">Informe de Ventas</h1>
            <p>
              En las fechas {fechaInicio} hasta {fechaFinal}
            </p>
            <h3 className="ventas-heading">
              Total de ventas realizadas: {datos[0].CANTIDAD}
            </h3>
            <h4 className="total-sum">Suma total: {datos[0].TOTAL}</h4>
          </div>
        </div>
      ) : (
        <p>No se encontraron facturas</p>
      )}

      <button type="button" className="custom-button" onClick={(e) => navegate("/registro-factura")}>
        Regresar
      </button>
    </div>
  );
};

export default InformeVentas; // Exported component name also changed to start with uppercase
