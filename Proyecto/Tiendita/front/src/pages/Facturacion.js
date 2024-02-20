import React from "react";
import Select from "react-select";
import "../css/facturacion.css";
import { useState, useEffect } from "react";
import {
  UNSAFE_DataRouterStateContext,
  useNavigate,
  useParams,
} from "react-router-dom";
import axios from "axios";
//URLS PARA CADA TABLA Y SOLICITUD DE LA BASE DE DATOS
const URI = "http://localhost:5000/producomplete/";
const URI2 = "http://localhost:5000/productos/";
const URI3 = "http://localhost:5000/clientesCed/";
const URI4 = "http://localhost:5000/categoria/";
const URI7 = "http://localhost:5000/proveedores/";
const URLClientes = "http://localhost:5000/clientes/";
const URI5 = "http://localhost:5000/detalles/";
const URI6 = "http://localhost:5000/facturas/";
const URI8 = "http://localhost:5000/detallesFactura/";

const Factura = () => {
  // Estado para controlar si se muestra el modal o no
  const [selectedOption, setSelectedOption] = useState(null);
  const [showProductos, setShowProductos] = useState(false);
  const [showClientes, setShowClientes] = useState(false);
  const [showModalCantidad, setShowModalCantidad] = useState(false);
  const [showModalCantidadUpdate, setShowModalCantidadUpdate] = useState(false);
  const [showDetalle, setShowDetalle] = useState(false);
  const [showClienteFactura, setShowClienteFactura] = useState(false);
  const [showBuscadorCedula, setShowBuscadorCedula] = useState(false);
  const [DetCantidad, setDetCantidad] = useState("");

  const [categorias, setCategorias] = useState([]);
  const [proveedor, setProveedor] = useState([]);
  //AGREGAMOS ESTADOS PARA CARGAR LOS PRODUCTOS
  const [productos, setProductos] = useState([]);
  //ESTADOS PARA LOS DATOS
  const navigate = useNavigate();
  const [Provid, setProvid] = useState("");
  const [Proid, setProid] = useState("");
  const [Catid, setCatid] = useState("");
  const [Nombre, setNombre] = useState("");
  const [Estado, setEstado] = useState("");
  const [Descripcion, setDescripcion] = useState("");
  const [Stock, setStock] = useState("");
  const [Precio, setPrecio] = useState("");
  const [Iva, setIva] = useState("Aplica");

  //----------------------------------------------------------------
  const [Cedula, setCedula] = useState("");
  const [CliId, setCliId] = useState("");
  const [PrimerApellido, setPrimerApellido] = useState("");
  const [SegundoApellido, setSegundoApellido] = useState("");
  const [PrimerNombre, setPrimerNombre] = useState("");
  const [SegundoNombre, setSegundoNombre] = useState("");
  const [Email, setEmail] = useState("");
  const [Contacto, setContacto] = useState("");
  const [Direccion, setDireccion] = useState("");
  const [FecNacimiento, setFecNacimiento] = useState("");
  const [EstadoCli, setEstadoCli] = useState("");
  const [FacId, setFacId] = useState("");
  const [FacMetodoPago, setFacMetodoPago] = useState("Ef");
  const [FacTotal, setFacTotal] = useState("");
  const [FacSubTotal, setSubFacTotal] = useState("");
  const [FacIva, setFacIva] = useState("");
  const [detalles, setDetalles] = useState([]);
const[clientes,setClientes]=useState([]);
  useEffect(() => {
    getProductos();
  }, []);
  const handleProductSelect = (selectedOption) => {
    const productId = selectedOption ? selectedOption.value : "";
    //setProid(productId); // Actualiza el estado de Proid
    localStorage.setItem("proid", productId);
    // Llama a la función detallar solo si hay un productId válido
    if (localStorage.getItem("proid") !== "") {
      detallar();
      setShowDetalle(true);
    }
  };

  const handleClienteSelect = (selectedOption) => {
    const ClienteCedula = selectedOption ? selectedOption.value : "";
    //setProid(productId); // Actualiza el estado de Proid
    localStorage.setItem("cliCedula", ClienteCedula);
    // Llama a la función detallar solo si hay un productId válido
    //alert(ClienteCedula)
    if (localStorage.getItem("cliCedula") !== "") {
      getClienteByCedula();
      //vale mandar aqui la funcion de imprimir directamente
    }
  };

  const getClientes = async () => {
    const res = await axios.get(URLClientes);
    setClientes(res.data);
  };

  // Dentro de tu componente Factura

  const getClienteByCedula = async () => {
    try {
      setCedula(localStorage.getItem("cliCedula"));
      const res = await axios.get(URI3 + Cedula);

      if (res.data.length > 0) {
        setCliId(res.data[0].CLI_ID);
        setCedula(res.data[0].CLI_CEDULA);
        setPrimerApellido(res.data[0].CLI_PRIMERAPELLIDO);
        setSegundoApellido(res.data[0].CLI_SEGUNDOAPELLIDO);
        setPrimerNombre(res.data[0].CLI_PRIMERNOMBRE);
        setSegundoNombre(res.data[0].CLI_SEGUNDONOMBRE);
        setEmail(res.data[0].CLI_EMAIL);
        setContacto(res.data[0].CLI_CONTACTO);
        setDireccion(res.data[0].CLI_DIRECCION);
        setFecNacimiento(res.data[0].CLI_FECNACIMIENTO);
        setEstadoCli(res.data[0].CLI_ESTADO);
        setShowProductos(true);
        //console.log(res.data);
        setShowClienteFactura(true);
      } else {
        // Si no se encuentra ningún producto con el id proporcionado
        console.log("No se encontró ningún producto con el ID: " + localStorage.getItem("cliCedula"));
        alert("El cliente no se encuentra registrado");
        //setShowProductos(false);
      }
    } catch (error) {
      // Manejo de errores
      console.error("Error al obtener los datos del producto:", error);
    }
  };

  const facturar = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(URI6, {
        CLI_ID: 1,
        FAC_IVA: 0,
        FAC_SUBTOTAL: 0,
        FAC_TOTAL: 0,
        FAC_METODOPAGO:"Ef",
        FAC_FECHA: fechaActualFormateada,
      });
      setShowClientes(true);
      getDetalles();
      const facturaId = response.data.facturaId;
      console.log("ID de la factura:", facturaId);
      setFacId(facturaId);
      // Ahora puedes utilizar el ID de la factura según tus necesidades
      // Por ejemplo, mostrarlo en pantalla, almacenarlo en el estado del componente, etc.

      //setShowClientes(true); // Por ejemplo, aquí estableces el estado 'showClientes' en 'true' según lo que necesites
    } catch (error) {
      // Manejar el error aquí
      console.error("Ocurrió un error al facturar:", error);
      // Puedes mostrar un mensaje de error al usuario o realizar alguna otra acción
    }
  };

  const updateFactura = async (e) => {
    try {
      await axios.put(URI6 + FacId, {
        CLI_ID: CliId,
        FAC_METODOPAGO: FacMetodoPago,

        // Otros datos que desees enviar en el cuerpo de la solicitud PUT
      });
      localStorage.setItem("idFactura", FacId);
      navigate("/impresion");
      alert("Factura ingresada correctamente");
      // Aquí puedes realizar acciones adicionales después de la actualización exitosa (si es necesario).
    } catch (error) {
      // Si ocurre un error durante la ejecución de axios.put, se capturará aquí.
      // Puedes manejar el error de la manera que desees, ya sea mostrando un mensaje al usuario o realizando otras acciones de recuperación.
      console.error("Error al actualizar la factura:", error);
    }
  };

  const detallar = async () => {
    try {
      await axios.post(URI5, {
        FAC_ID: FacId,
        PRO_ID: localStorage.getItem("proid"),
        DET_CANTIDAD: 1,
      });

      setShowModalCantidad(false);
      getProductos();
      getDetalles();
    } catch (error) {
      // Manejar el error aquí
      console.error("Ocurrió un error al facturar:", error);
      // Puedes mostrar un mensaje de error al usuario o realizar alguna otra acción
    }
  };

  const updateDetalle = async () => {
    try {
      var idAux = localStorage.getItem("id");
      //console.log("detalleCantidadI",localStorage.getItem("cant"))
      setDetCantidad();
      //console.log("can", DetCantidad);
      await axios.put(URI5 + idAux, {
        DET_CANTIDAD: localStorage.getItem("cant"),
      });

      getDetalles();
    } catch (error) {
      // Manejar errores de la solicitud aquí
      alert("La cantidad ingresada supera el stock del producto.", error);
      // Mostrar una alerta u otra acción de manejo de errores si es necesario
    }
  };

  const deleteDetalle = async (id) => {
    await axios.delete(`${URI5}${id}`);
    getDetalles();
  };

  const getProductoById = async () => {
    try {
      var idAux = localStorage.getItem("id");
      const res = await axios.get(URI2 + idAux);

      if (res.data.length > 0) {
        setProid(res.data[0].PRO_ID);
        setNombre(res.data[0].PRO_NOMBRE);
        setProvid(res.data[0].PROV_ID);
        setCatid(res.data[0].CAT_ID);
        setDescripcion(res.data[0].PRO_DESCRIPCION);

        setStock(res.data[0].PRO_STOCK);
        setPrecio(res.data[0].PRO_PRECIO);
        setIva(res.data[0].PRO_IVA);
        setEstado(res.data[0].PRO_ESTADO);
      } else {
        // Si no se encuentra ningún producto con el id proporcionado

        console.log("No se encontró ningún producto con el ID: " + idAux);
      }
    } catch (error) {
      // Manejo de errores
      console.error("Error al obtener los datos del producto:", error);
    }
  };

  const getProductos = async () => {
    const res = await axios.get(URI);
    setProductos(res.data);
  };

  const getDetalles = async () => {
    if (FacId !== "") {
      try {
        const res = await axios.get(URI8 + FacId);

        setDetalles(res.data);
        getProductos();
        //console.log("detalles", res.data);
        //console.log();
      } catch (error) {
        // Manejo de errores
        console.error("Error al obtener los datos del producto:", error);
      }
    }
  };
  const getFactura = async () => {
    if (FacId !== "") {
      try {
        const res = await axios.get(URI6 + FacId);

        setFacTotal(res.data[0].FAC_TOTAL);
        setSubFacTotal(res.data[0].FAC_SUBTOTAL);
        setFacIva(res.data[0].FAC_IVA);

        //console.log("detalles", res.data);
        //console.log();
      } catch (error) {
        // Manejo de errores
        console.error("Error al obtener los datos del producto:", error);
      }
    }
  };

  useEffect(() => {
    getCategorias();
    getProveedor();
    getProductoById();
    getClientes();
  }, []);

  useEffect(() => {
    getFactura();
    getDetalles();
  });

  const getCategorias = async () => {
    const res = await axios.get(URI4);
    setCategorias(res.data);
  };

  const getProveedor = async () => {
    const res = await axios.get(URI7);
    setProveedor(res.data);
  };
  ////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////
  const fechaActual = new Date();
  const anio = fechaActual.getFullYear();
  const mes = fechaActual.getMonth() + 1; // Los meses en JavaScript van de 0 a 11
  const dia = fechaActual.getDate();

  const fechaActualFormateada = `${anio}-${mes}-${dia}`;
  //console.log(fechaActualFormateada);
  const renderProductoDetalle = () => {
    if (showDetalle === true) {
      return (
        <div style={{ textAlign: "center", alignContent: "center" }}>
          <table id="productos_detalle">
            <thead>
              <tr>
                <th>CANTIDAD</th>
                <th>PRODUCTO</th>
                <th>PRECIO UNITARIO</th>
                <th>PRECIO TOTAL</th>
                <th>ELIMINAR</th>
              </tr>
            </thead>
            <tbody>
              {detalles.map((detalle, index) => (
                <tr key={detalle.DET_ID}>
                  <td>
                    <input
                      type="number"
                      id={`cantidad-${detalle.DET_ID}`}
                      className={`input_cantidad_detalle ${
                        DetCantidad > detalle.PRO_STOCK ? "input_rojo" : ""
                      }`}
                      name={`cantidad-${detalle.DET_ID}`}
                      placeholder={detalle.DET_CANTIDAD}
                      min={1}
                      max={detalle.PRO_STOCK}
                      //value={DetCantidad} // Usar el valor del estado aquí
                      onChange={(e) => {
                        const newCantidad = parseInt(e.target.value);
                        if (!isNaN(newCantidad)) {
                          // Actualizar el estado con el nuevo valor
                          setDetCantidad(newCantidad);

                          // Guardar en el almacenamiento local usando el ID correcto
                          localStorage.setItem("cant", newCantidad);
                          localStorage.setItem("id", detalle.DET_ID);
                          // Llamar a la función de actualización si es necesario
                          if (newCantidad <= detalle.PRO_STOCK) {
                            updateDetalle();
                          } else {
                            alert("NO EXISTE EL STOCK SUFICIENTE DEL PRODUCTO");
                          }
                        }
                      }}
                    />
                  </td>
                  <td> {detalle.PRO_NOMBRE} </td>
                  <td> {detalle.PRO_PRECIO} </td>
                  <td> {detalle.DET_PRECIOTOTAL} </td>

                  <td>
                    <button
                      onClick={() => deleteDetalle(detalle.DET_ID)}
                      className="btn btn-danger"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  };

  const renderProductoDetalleFactura = () => {
    return (
      <div style={{ textAlign: "center", alignContent: "center" }}>
        <br />
        <br />
        <div style={{ textAlign: "center", alignContent: "center" }}></div>

        <table className="tabla-detalle-factura">
          <thead>
            <tr>
              <th>CANTIDAD</th>
              <th>PRODUCTO</th>
              <th>PRECIO UNITARIO</th>
              <th>PRECIO TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {detalles.map((detalle, index) => (
              <tr key={detalle.DET_ID}>
                <td> {detalle.DET_CANTIDAD} </td>
                <td> {detalle.PRO_NOMBRE+": "+detalle.PRO_DESCRIPCION} </td>
                <td> ${parseFloat(detalle.PRO_PRECIO).toFixed(2)} </td>
                <td> ${parseFloat(detalle.DET_PRECIOTOTAL).toFixed(2)} </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="container">
      <br />
      <br />
      {showClientes === false && showProductos === false && (
        <>
        <div className="container" style={{textAlign:"center"}}>
        <form onSubmit={facturar} className="product-form" style={{marginTop:"150px",marginBottom:"200px"}}>
            <button className="custom-button" type="submit">
              Ingresar Productos al Detalle
            </button>
          </form>
        </div>
          
        </>
      )}
      {showClientes === true && (
        <>
          <h1 style={{ textAlign: "center" }}>
            Ingreso de Productos al Detalle
          </h1>
          <div className="contenedor_select_boton">
            <Select
  className="productSelect"
  isSearchable
  options={productos
    .filter((producto) => producto.PRO_STOCK > 0 && producto.PRO_ESTADO === "Activo") // Filtra productos con stock mayor a 0 y estado "ACTIVO"
    .map((producto) => ({
      value: producto.PRO_ID,
      label: `${producto.PRO_NOMBRE} - ${producto.PRO_DESCRIPCION}`,
    }))
  }
  placeholder="Buscar por Producto"
  onChange={handleProductSelect}
/>
            <button
              onClick={() => {
                setShowClientes(false);
                setShowProductos(true);
                getDetalles();
              }}
              className="custom-button"
              id="boton_Enviar_Detalle"
            >
              Enviar Detalle a la Factura {"  "}
              <i class="fa fa-paper-plane" aria-hidden="true"></i>
            </button>
          </div>
          <br />
          {renderProductoDetalle()}
          <br />
          <br />
        </>
      )}

      {showClientes === false &&
        showProductos === true &&
        showClienteFactura === false && (
          <>
            <div className="botones-factura-consumidor">
              <button
                style={{ borderRadius: "20px", marginLeft: "30px" }}
                className="custom-button"
                onClick={() => {
                  setShowBuscadorCedula(true);
                }}
              >
                Factura
              </button>
              <button
                className="custom-button"
                style={{ borderRadius: "20px", marginLeft: "30px" }}
                onClick={() => {
                  navigate("/impresion");
                  localStorage.setItem("idFactura", FacId);
                }}
              >
                Consumidor Final
              </button>
            </div>
            {showBuscadorCedula === true && (
              <div
                className="form-group"
                style={{
                  
                 marginTop:"60px",
                  marginLeft: "30%",
                  marginBottom:"200px",
                }}
              >
                {" "}
                <Select
              className="ClienteSelect"
              isSearchable
              options={clientes.map((cliente) => ({
                value: cliente.CLI_CEDULA,
                label: cliente.CLI_CEDULA + "---" + cliente.CLI_PRIMERNOMBRE + " "+cliente.CLI_PRIMERAPELLIDO,
              }))}
              placeholder="Buscar por cedula"
              onChange={handleClienteSelect}// Solo pasa la función como manejador de eventos
            />


               {" "}
                <button
                  onClick={() => {
                    getClienteByCedula(localStorage.getItem("cliCedula"));
                    getFactura();
                  }}
                  className="custom-button"
                  style={{
                    marginLeft: "8px",
                    marginTop: "0",
                    padding: "6px 30px",
                    borderRadius: "50%",
                  }}
                >
                  <i class="fa fa-search" aria-hidden="true"></i>
                </button>
              </div>
            )}
          </>
        )}
      {showClientes === false &&
        showProductos === true &&
        showClienteFactura === true && (
          
          <>
          <div className="cont-encabezado">
          <h1 style={{ marginTop: "20px",textAlign:"center" }}>
          TIENDITA
        </h1>
        <br/>
        <button
                onClick={() => {
                  updateFactura();
                }}
                className="custom-button"
              >
               
                <i class="fa fa-check" aria-hidden="true"></i>FACTURAR
              </button>
              <div className="form-group" style={{textAlign:"center",alignContent:"center"}}>
          
                <select
                  id="metodoPago"
                  className="combobox"
                  name="metodoPago"
                  value={FacMetodoPago}
                  onChange={(e) => setFacMetodoPago(e.target.value)}
                >
                  <option>Seleccione el Método de Pago</option>
                  <option value="Ef">Efectivo</option>
                  <option value="Tr">Transferencia</option>
                </select>
              </div> 

          </div>
          
            <div className="factura-diseño"style={{ textAlign: "center" }}>
            
              <div className="contenedor">
              <br/>
              <h4 style={{ textAlign: "right" }}>
                Número de factura: {FacId}
              </h4>
              <h4 style={{ textAlign: "right",marginRight:"20px" }}>
                Fecha: {fechaActualFormateada}{" "}
              </h4>
              <br/>
              <h1 style={{ textAlign: "left" }}>Total: ${parseFloat(FacTotal).toFixed(2)}</h1>
              
              <h4 style={{ textAlign: "left" }}>
                Cliente: {PrimerApellido + " " + PrimerNombre}
              </h4>
              <h4 style={{ textAlign: "left" }}>Dirección: {Direccion}</h4>
              <h4 style={{ textAlign: "left" }}>Teléfono: {Contacto}</h4>
              <h4 style={{ textAlign: "left" }}>Correo: {Email}</h4>
              
              {renderProductoDetalleFactura()
              }
              </div>
            </div>
          </>
        )}
    </div>
  );
};

export default Factura;
