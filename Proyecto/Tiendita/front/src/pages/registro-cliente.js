import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


//URL PARA RECUPERAR LOS DATOS DE LA TABLA CLIENTE DE LA BASE DE DATOS
const URI = "http://localhost:5000/clientes/";

//INICIO DEL COMPONENTE
const RegistroCliente = () => {
  // Estado para controlar si se muestra el modal o no
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setEditShowModal] = useState(false);
  //ESTADO PARA CARGAR DEL FORMULARIO EL INDICE DE BUSQUEDA POR CEDULA
  const [searchTerm, setSearchTerm] = useState("");
  //AGREGAMOS ESTADOS PARA CARGAR LOS CLIENTES
  const [clientes, setClientes] = useState([]);
  //ESTADOS PARA LOS DATOS
  const { id } = useParams();
  const [Cedula, setCedula] = useState("");

  const [PrimerApellido, setPrimerApellido] = useState("");
  const [SegundoApellido, setSegundoApellido] = useState("");
  const [PrimerNombre, setPrimerNombre] = useState("");
  const [SegundoNombre, setSegundoNombre] = useState("");
  const [Email, setEmail] = useState("");
  const [Contacto, setContacto] = useState("");
  const [Direccion, setDireccion] = useState("");
  const [FecNacimiento, setFecNacimiento] = useState("");
  const [Estado, setEstado] = useState("");

  //FUNCION PARA ACTUALIZAR LOS DATOS DEL CLIENTE
  const update = async (e) => {
    e.preventDefault();
    if (!verificarCedula(Cedula)) {
      alert("Cédula no válida");
      return;
    }
  
    const dob = new Date(FecNacimiento);
    const today = new Date();
  
    if (dob > today) {
      alert('La fecha de nacimiento no es valida.');
      return;
    }
  
    let age = today.getFullYear() - dob.getFullYear();
  
    if (today.getMonth() < dob.getMonth() || (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())) {
      age--;
    }
  
    if (age < 18) {
      alert('El cliente debe tener al menos 18 años.');
      return;
    }
  
    try {
      const idAux = localStorage.getItem("id");
      await axios.put(URI + idAux, {
        CLI_CEDULA: Cedula,
        CLI_PRIMERAPELLIDO: PrimerApellido,
        CLI_SEGUNDOAPELLIDO: SegundoApellido,
        CLI_PRIMERNOMBRE: PrimerNombre,
        CLI_SEGUNDONOMBRE: SegundoNombre,
        CLI_EMAIL: Email,
        CLI_CONTACTO: Contacto,
        CLI_DIRECCION: Direccion,
        CLI_FECNACIMIENTO: FecNacimiento,
        CLI_ESTADO: Estado,
      });
  
      setEditShowModal(false);
      getClientes();
    } catch (error) {
      console.error("Error al Actualizar Datos del Cliente:", error);
    }
  };  

  function verificarCedula(cedula) {
    if (typeof(cedula) == 'string' && cedula.length == 10 && /^\d+$/.test(cedula)) {
      var digitos = cedula.split('').map(Number);
      var codigo_provincia = digitos[0] * 10 + digitos[1];
  
      //if (codigo_provincia >= 1 && (codigo_provincia <= 24 || codigo_provincia == 30) && digitos[2] < 6) {
  
      if (codigo_provincia >= 1 && (codigo_provincia <= 24 || codigo_provincia == 30)) {
        var digito_verificador = digitos.pop();
  
        var digito_calculado = digitos.reduce(
          function (valorPrevio, valorActual, indice) {
            return valorPrevio - (valorActual * (2 - indice % 2)) % 9 - (valorActual == 9) * 9;
          }, 1000) % 10;
        return digito_calculado === digito_verificador;
  }
    }
    return false;
  }
  
  const resetState = () => {
    setCedula("");
    setPrimerNombre("");
    setContacto("");
    setEmail("");
  };

  //efecto para obtener al cliente por el ID
  useEffect(() => {
    document.title = "CLIENTES";
    getClientes();
    if (id) {
      getClienteById();
    }
  });

  // Effect to reset the state when the "Agregar proveedores" modal is shown
  useEffect(() => {
    if (showModal) {
      resetState();
    }
  }, [showModal]);

  const nuevoCliente = async (e) => {
    e.preventDefault();
    if (!verificarCedula(Cedula)) {
      alert("Cédula no válida");
      return;
    }
    const dob = new Date(FecNacimiento);
    const today = new Date();
  
    if (dob > today) {
      alert('La fecha de nacimiento no es valida.');
      return;
    }
  
    let age = today.getFullYear() - dob.getFullYear();
  
    if (today.getMonth() < dob.getMonth() || (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())) {
      age--;
    }
  
    if (age < 18) {
      alert('El cliente debe tener al menos 18 años.');
      return;
    }
  
    try {
      await axios.post(URI, {
        CLI_CEDULA: Cedula,
        CLI_PRIMERAPELLIDO: PrimerApellido,
        CLI_SEGUNDOAPELLIDO: SegundoApellido,
        CLI_PRIMERNOMBRE: PrimerNombre,
        CLI_SEGUNDONOMBRE: SegundoNombre,
        CLI_EMAIL: Email,
        CLI_CONTACTO: Contacto,
        CLI_DIRECCION: Direccion,
        CLI_FECNACIMIENTO: FecNacimiento,
        CLI_ESTADO: 'Activo',
      });
      setShowModal(false);
      getClientes();
    } catch (error) {
      console.error('Error al agregar nuevo cliente:', error);
    }
  };
  
  
  // Funcion que valida el formato de correo electrónico
  const validarCorreoElectronico = (email) => {
    // Expresión regular para validar el formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const atIndex = email.indexOf("@");
    if (atIndex !== -1) {
      // Si hay un "@" en el correo, validamos que no haya números después de él
      const afterAt = email.substring(atIndex + 1);
      if (/\d/.test(afterAt)) {
        return false;
      }
    }
    return emailRegex.test(email);
  };

  // Funcion que valida los cambios en la cedula y el telefono
  const handleNumeroChange = (e) => {
    const value = e.target.value;

    if (validarNumero(value) || value === "") {
      // Validamos que sean solo números o un campo vacío

      const inputName = e.target.name;
      switch (inputName) {
        case "cedula":
          setCedula(value);

          break;

        case "telefono":
          setContacto(value);

          break;

        default:
          alert("¡Este Campo solo contiene números!");
          break;
      }
    }
  };

  // Funcion que valida los cambios del primer y segundo nombre que solo se ingresen caracteres
  const handleTextChange = (e) => {
    try {
      const value = e.target.value;
      if (validarTexto(value) || value === "") {
        const inputName = e.target.name;
        switch (inputName) {
          case "primerNombre":
            setPrimerNombre(value);
            break;
          case "segundoNombre":
            setSegundoNombre(value);
            console.log(inputName + "texto" + SegundoNombre);
            break;
          case "primerApellido":
            setPrimerApellido(value);
            break;
          case "segundoApellido":
            setSegundoApellido(value);
            break;
          default:
            alert("¡Este campo solo requiere caracteres!");
            break;
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  //Validar si el valor son caracteres
  const validarTexto = (value) => /^[A-Za-z]+$/.test(value);

  //Validar si el valor es un numero
  const validarNumero = (value) => /^\d+$/.test(value);

  //FUNCION PARA AGREGAR UN NUEVO CLIENTE

  //funcion para cargar los datos del cliente por el ID enviado mediante la seleccion del boton editar de las tablas
  const getClienteById = async () => {
    try {
      var idAux = localStorage.getItem("id");
      const res = await axios.get(URI + idAux);

      if (res.data.length > 0) {
        setCedula(res.data[0].CLI_CEDULA);
        setPrimerApellido(res.data[0].CLI_PRIMERAPELLIDO);
        setSegundoApellido(res.data[0].CLI_SEGUNDOAPELLIDO);
        setPrimerNombre(res.data[0].CLI_PRIMERNOMBRE);
        setSegundoNombre(res.data[0].CLI_SEGUNDONOMBRE);
        setEmail(res.data[0].CLI_EMAIL);
        setContacto(res.data[0].CLI_CONTACTO);
        setDireccion(res.data[0].CLI_DIRECCION);
        const formattedDate = new Date(res.data[0].CLI_FECNACIMIENTO)
          .toISOString()
          .split("T")[0];
        setFecNacimiento(formattedDate);
        console.log(res.data[0].CLI_FECNACIMIENTO);
        setEstado(res.data[0].CLI_ESTADO);
        
      } else {
        // Si no se encuentra ningún cliente con el id proporcionado
        console.log("No se encontró ningún cliente con el ID: " + idAux);
      }
    } catch (error) {
      // Manejo de errores
      console.error("Error al obtener los datos del cliente:", error);
    }
  };

  //funcion para obtener todos los clientes
  const getClientes = async () => {
    const res = await axios.get(URI);
    setClientes(res.data);
  };
  //funcion para alterar el estado del cliente pasamos de activo a inactivo
  const deleteClientes = async (id) => {
    await axios.put(URI + id, {
      CLI_ESTADO: "Inactivo",
    });
    getClientes();
  };
  //funcion para pasar el estado del cliente a activo
  const ActivarClientes = async (id) => {
    await axios.put(URI + id, {
      CLI_ESTADO: "Activo",
    });
    getClientes();
  };
  // Renderizar la tabla con los clientes
  const renderClientesTabla = () => {
    const filteredClientes = clientes.filter((cliente) => {
      return (
        cliente.CLI_CEDULA.toLowerCase().includes(searchTerm.toLowerCase()) &&
        cliente.CLI_CEDULA !== "9999999999"
      );
    });

    // Separar clientes con estado "Inactivo" y colocarlos al final de la lista
    const clientesActivos = filteredClientes.filter(
      (cliente) => cliente.CLI_ESTADO === "Activo"
    );
    const clientesInactivos = filteredClientes.filter(
      (cliente) => cliente.CLI_ESTADO === "Inactivo"
    );
    //constante para ordenar los clientes
    const clientesOrdenados = [...clientesActivos, ...clientesInactivos];

    // Funcion que valida los cambios en la cedula

    //retorna la tabla con todos los clientes
    return (
      <table className="centrar-tabla">
        <thead>
          <tr>
            <th>CEDULA</th>
            <th>NOMBRE</th>
            <th>EMAIL</th>
            <th>CONTACTO</th>
            <th>DIRECCION</th>
            <th>FECHA DE NACIMIENTO</th>
            <th>ESTADO</th>
            <th>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {clientesOrdenados.map((cliente, index) => (
            <tr
              key={cliente.CLI_ID} // Add a unique key prop here
              style={
                cliente.CLI_ESTADO === "Inactivo"
                  ? { backgroundColor: "pink" }
                  : {}
              }
            >
              <td> {cliente.CLI_CEDULA} </td>
              <td>
                {cliente.CLI_PRIMERAPELLIDO}{" "}
                {cliente.CLI_SEGUNDOAPELLIDO ? cliente.CLI_SEGUNDOAPELLIDO : ""}{" "}
                {cliente.CLI_PRIMERNOMBRE}{" "}
                {cliente.CLI_SEGUNDONOMBRE ? cliente.CLI_SEGUNDONOMBRE : ""}
              </td>
              <td> {cliente.CLI_EMAIL} </td>
              <td> {cliente.CLI_CONTACTO} </td>
              <td> {cliente.CLI_DIRECCION} </td>
              <td>
                {/* Mostrar solo la fecha en formato año-mes-día */}
                {cliente.CLI_FECNACIMIENTO
                  ? new Date(cliente.CLI_FECNACIMIENTO).toLocaleDateString(
                      "es-ES"
                    )
                  : ""}
              </td>
              <td> {cliente.CLI_ESTADO} </td>
              <td>
                <button
                  onClick={() => {
                    localStorage.setItem("id", cliente.CLI_ID); //guarda el id del cliente para obtener sus datos por el id
                    getClienteById(); //llamamos a la funcion que obtenga los datos de un cliente por el ID
                    setEditShowModal(true); //enviamos un true para que se abra el modal con el formulario para editar al cliente
                  }}
                  className="btn btn-info"
                >
                  <i className="fas fa-edit"></i>
                </button>
                {cliente.CLI_ESTADO === "Activo" && (
                  //recorremos por cliente y solo si el estado es activo se muestra esta seccion o boton
                  <>
                    <button
                      onClick={() => deleteClientes(cliente.CLI_ID)}
                      className="btn btn-warning"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </>
                )}
                {cliente.CLI_ESTADO === "Inactivo" && (
                  //recorremos por cliente y solo si el estado es inactivo se muestra esta seccion o boton
                  <>
                    <button
                      onClick={() => ActivarClientes(cliente.CLI_ID)}
                      className="btn btn-success"
                      data-testid="test-btnact"
                    >
                      <i className="fas fa-check"></i>
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    //retorna la parte de arriba del sitio
    <div className="container" style={{ textAlign: "center" }}>
      <div
        style={{ textAlign: "center", marginTop: "25px", marginBottom: "25px" }}
      >
        <div data-testid='rc-1'>

            <h1>GESTIÓN DE CLIENTES</h1>
        </div>
      </div>
      {/*boton  que llama abre el formulario de registro de un nuevo cliente*/}
      <button className="custom-button" data-testid='rc-butonIngr' onClick={() => setShowModal(true)}>
        Agregar Cliente{" "}
        <i className="fas fa-add" style={{ marginLeft: "5px" }}></i>
      </button>
      {/*Campo del formulario para ingreso de busqueda de cliente por numero de cedula*/}
      <br />
      <div className="">
        <br />{" "}
        <input
          type="text"
          id="search"
          name="search"
          value={searchTerm}
          maxLength={13}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por cedula"
        />
      </div>
      <br />
      {/*llamamos al componente creado donde esta la tabla de todos los clientes que estan en la base de datos*/}
      {renderClientesTabla()}

      {/* Modal para el formulario */}
      {showModal && (
        <div className="modal" style={{ zIndex: "100" }}>
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <h2>Agregar Cliente</h2>
            <form onSubmit={nuevoCliente}>
              <div className="form-group" data-testid='rc-ci'>
                <label htmlFor="cedula">Cedula:</label>
                <input
                  type="text"
                  id="cedula"
                  name="cedula"
                  maxLength={10}
                  placeholder="Ingrese numero de cedula"
                  onChange={handleNumeroChange}
                  value={Cedula}
                  required
                />
              </div>
              <div className="form-group" data-testid='rc-pname' >
                <label htmlFor="primerNombre">Primer Nombre:</label>
                <input
                  type="text"
                  id="primerNombre"
                  name="primerNombre"
                  placeholder="Ingrese primer nombre"
                  onChange={handleTextChange}
                  value={PrimerNombre}
                  required
                />
              </div>
              <div className="form-group" data-testid='rc-sname'>
                <label htmlFor="segundoNombre">Segundo Nombre:</label>
                <input
                  type="text"
                  id="segundoNombre"
                  name="segundoNombre"
                  placeholder="Ingrese segundo nombre"
                  onChange={handleTextChange}
                />
              </div>
              <div className="form-group" data-testid='rc-pap'>
                <label htmlFor="primerApellido">Primer Apellido:</label>
                <input
                  type="text"
                  id="primerApellido"
                  name="primerApellido"
                  placeholder="Ingrese primer apellido"
                  onChange={handleTextChange}
                  required
                />
              </div>
              <div className="form-group" data-testid='rc-sap'>
                <label htmlFor="segundoApellido">Segundo Apellido:</label>
                <input
                  type="text"
                  id="segundoApellido"
                  name="segundoApellido"
                  placeholder="Ingrese segundo apellido"
                  onChange={handleTextChange}
                />
              </div>
              <div className="form-group" data-testid='rc-telf'>
                <label htmlFor="telefono">Teléfono:</label>
                <input
                  type="telf"
                  id="telefono"
                  name="telefono"
                  maxLength={10}
                  value={Contacto}
                  placeholder="Ingrese telefono"
                  onChange={handleNumeroChange}
                  required
                />
              </div>
              <div className="form-group" data-testid='rc-dir'>
                <label htmlFor="direccion">Dirección:</label>
                <input
                  type="text"
                  id="direccion"
                  name="direccion"
                  placeholder="Ingrese dirección"
                  onChange={(e) => setDireccion(e.target.value)}
                  required
                />
              </div>
              <div className="form-group" data-testid='rc-email'>
                <label htmlFor="correoElectronico">Correo Electrónico:</label>
                <input
                  type="email"
                  id="correoElectronico"
                  name="correoElectronico"
                  placeholder="Ingrese correo electronico"
                  onChange={(e) => setEmail(e.target.value)}
                  value={Email}
                  required
                />
              </div>
              <div className="form-group" data-testid='rc-nac'>
                <label htmlFor="fecha de Nacimiento">
                  Fecha de Nacimiento:
                </label>
                <input
                  type="date"
                  id="FecNacimiento"
                  name="FecNacimiento"
                  onChange={(e) => setFecNacimiento(e.target.value)}
                />
              </div>
              <button className="custom-button" type="submit" data-testid='rc-btnregistro'>
                Registrar
              </button>
            </form>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setEditShowModal(false)}>
              &times;
            </span>
            <h2>Actualizar Cliente</h2>
            <form onSubmit={update}>
              <div className="form-group">
                <label htmlFor="cedula">Cedula:</label>
                <input
                  type="text"
                  id="cedula"
                  name="cedula"
                  maxLength={10}
                  className="centered-input"
                  value={Cedula}
                  onChange={(e) => setCedula(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="primerNombre">Primer Nombre:</label>
                <input
                  type="text"
                  id="primerNombre"
                  name="primerNombre"
                  className="centered-input"
                  value={PrimerNombre}
                  onChange={(e) => setPrimerNombre(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="segundoNombre">Segundo Nombre:</label>
                <input
                  type="text"
                  id="segundoNombre"
                  name="segundoNombre"
                  className="centered-input"
                  value={SegundoNombre}
                  onChange={(e) => setSegundoNombre(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="primerApellido">Primer Apellido:</label>
                <input
                  type="text"
                  id="primerApellido"
                  name="primerApellido"
                  className="centered-input"
                  value={PrimerApellido}
                  onChange={(e) => setPrimerApellido(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="segundoApellido">Segundo Apellido:</label>
                <input
                  type="text"
                  id="segundoApellido"
                  name="segundoApellido"
                  className="centered-input"
                  value={SegundoApellido}
                  onChange={(e) => setSegundoApellido(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="telefono">Teléfono:</label>
                <input
                  type="text"
                  id="telefono"
                  name="telefono"
                  className="centered-input"
                  value={Contacto}
                  onChange={handleNumeroChange}
                  maxLength={10}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="direccion">Dirección:</label>
                <input
                  type="text"
                  id="direccion"
                  name="direccion"
                  className="centered-input"
                  value={Direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="correoElectronico">Correo Electrónico:</label>
                <input
                  type="email"
                  id="correoElectronico"
                  name="correoElectronico"
                  className="centered-input"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="fecha de Nacimiento">
                  Fecha de Nacimiento:
                </label>
                <input
                  type="date"
                  id="FecNacimiento"
                  name="FecNacimiento"
                  value={FecNacimiento}
                  onChange={(e) => setFecNacimiento(e.target.value)}
                />
              </div>
              <button className="custom-button" type="submit">
                Registrar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistroCliente;
