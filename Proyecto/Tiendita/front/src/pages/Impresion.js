import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios";

import "../css/impresion.css";
const Impresion = () => {
  const [datos, setDatos] = useState([]);
  const urlDatos = "http://localhost:5000/impresionFactura/";
  const idFactura = localStorage.getItem("idFactura");

  const getDatosFactura = async () => {
    try {
      const res = await axios.get(urlDatos + idFactura);
      setDatos(res.data);
    } catch {
      console.log("error");
    }
  };




  useEffect(() => {
    try {
      getDatosFactura();
    } catch (error) {
      alert("Error: " + error);
    }
  }, [datos]);

  const handlePrint = () => {
    const content = document.getElementById("content-to-print");
    html2canvas(content).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10, 187, 0, "FAST");
      const archivo="Factura_"+idFactura+".pdf"
      pdf.save(archivo);
    });
  };

  return (
    <div id="cont">  <br></br>
    <input className="custom-button" type="button" value="Imprimir" onClick={handlePrint} />
    <br></br>
    <div className="container" id="content-to-print">
      
    
      <br></br>
      <br></br>
      <div className="datos">
        <div className="datos-empresa">
        <br/>
        <h3 className="nombre-tienda">TIENDITA</h3>
          <p>Dirección:   </p><p>Av. General Rumiñahui-Sangolqui</p>
          <p>Telf: 02 3344 566 <t/>  Cel: 0979249304</p><br/>
          <p style={{fontSize:"10px",fontWeight:"bold"}}>"CONTRIBUYENTE NEGOCIO POPULAR <br/>REGIMEN RIMPE"</p>
          
         
        </div>
        {datos.length > 0 && (
          <div className="datos-factura">
             <p>R.U.C: 1725412371001</p>
             <p>NOTA DE VENTA <p style={{fontSize:"10px"}}>SERIE 001-001</p></p>
             <h2>N° 000000-{idFactura}</h2>
             _________________________________
             <p>AUT. SRI: 1130924722</p>
             <p style={{fontSize:"10px"}}>FECHA DE AUTORIZACIÓN 19-ENERO-2023</p>
          </div>
          
        )} 
      </div>{datos.length > 0 && (
      <div className="datos-cliente">
        <p>Fecha: {datos[0].FAC_FECHA.slice(0,-14)}{".................................................................................."}C.I./RUC/: {datos[0].CLI_CEDULA}.........................................</p>
            <p>
              Nombre:{" "}
              {datos[0].CLI_PRIMERNOMBRE + " " + datos[0].CLI_PRIMERAPELLIDO}.............................................................................
            </p>
            <p>Dirección: {datos[0].CLI_DIRECCION}.................................................................Telf: {datos[0].CLI_CONTACTO}..................................................</p>
            <p></p>
            
            
          </div>)}
      <div className="datos-productos">
        <table className="tbl-productos">
          <thead>
            <tr>
              <th>CANT.</th>
              <th>DESCRIPCION</th>
              <th>P. UNITARIO</th>
              <th>P. TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {datos.length > 0 &&
              datos.map((producto, i) => (
                <tr key={i}>
                  <td>{producto.DET_CANTIDAD}</td>
                  <td>{producto.PRO_DESCRIPCION}</td>
                  <td>${parseFloat(producto.PRO_PRECIO).toFixed(2)} </td>
                  <td>${parseFloat(producto.DET_PRECIOTOTAL).toFixed(2)} </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="caja-datos">
      <div className="tipo-pago">
          <table>
            <thead >
              <th colspan="3">FORMA DE PAGO</th>
              
            </thead>{datos.length > 0 && (
            <tbody>
           
                <tr >

                  <td>EFECTIVO</td>
                  <td>{datos[0].FAC_METODOPAGO === "Ef" && (
                    <i class="fa fa-check" aria-hidden="true"></i>
              )}</td>
                 
  
                </tr>
                
             
              
                <tr >

                 
                  <td>DINERO ELECTRÓNICO</td>
                  <td>{datos[0].FAC_METODOPAGO === "Tr" && (
                    <i class="fa fa-check" aria-hidden="true"></i>
              )}</td>
  
                </tr>
                <tr >
                <td>OTROS</td>
                <td>{datos[0].FAC_METODOPAGO === "T" && (
                    <i class="fa fa-check" aria-hidden="true"></i>
              )}</td></tr>
            </tbody>)}
          </table>
        </div>
        <div className="datos-calculados">
          <table>
            <thead>
              <th>SubTotal</th>
              <th>IVA 12%</th>
              <th>Valor Total</th>
            </thead>
            <tbody>
              {datos.length > 0 && (
                <tr>
                  <td>${parseFloat(datos[0].FAC_SUBTOTAL).toFixed(2)}</td>
                  <td>${parseFloat(datos[0].FAC_IVA).toFixed(2)}</td>
                  <td>${parseFloat(datos[0].FAC_TOTAL).toFixed(2)}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div></div>
  );
};

export default Impresion;
