import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
//URL PARA RECUPERAR LOS DATOS DE LA TABLA CLIENTE DE LA BASE DE DATOS
const URI = "http://localhost:5000/proveedores/";

//INICIO DEL COMPONENTE
const RegistroProveedor = () => {
  useEffect(() => {
    document.title = "PROVEEDORES"
    
});
    const [selectedProveedorName, setSelectedProveedorName] = useState(""); // Estado para el nombre del proveedor seleccionado
    const [selectedEstado, setSelectedEstado] = useState(""); // Estado para filtrar por estado
    // Estado para controlar si se muestra el modal o no
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setEditShowModal] = useState(false);
    //AGREGAMOS ESTADOS PARA CARGAR LOS PROVEEDORES
    const [searchTerm, setSearchTerm] = useState("");
    const [proveedores, setProveedores] = useState([]);
    //ESTADOS PARA LOS DATOS
    const navigate = useNavigate();
    const { id } = useParams();
    const [Ruc, setRuc] = useState("");
    const [Nombre, setNombre] = useState("");
    const [Email, setEmail] = useState("");
    const [Contacto, setContacto] = useState("");
    const [Direccion, setDireccion] = useState("");
    const [Estado, setEstado] = useState("");
  
    useEffect(() => {
      getProveedores();
    }, []);
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
        case "ruc":
          setRuc(value);

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
    const value = e.target.value;
    const inputName = e.target.name;
  
    let valid = false; // Variable para validar si los datos son correctos
  
    if (inputName === "Nombre") {
      valid = validarTexto(value);
      setNombre(value.replace(/\d/g, ""));
    }
  };
  //Validar si el valor es un texto
  const validarTexto = (value) => /^[A-Za-z\s]+$/.test(value);

  //Validar si el valor es un numero
  const validarNumero = (value) => /^\d+$/.test(value);  
    // Form validation function
    
  const validarFormulario = () => {
    // Validar que el RUC tenga exactamente 13 dígitos
    if (Ruc.length !== 13) {
      alert('El RUC debe tener exactamente 13 dígitos.');
      return false;
    }

    // Validar que el campo de contacto tenga exactamente 10 dígitos
    if (Contacto.length !== 10) {
      alert('El campo de contacto/telefono debe tener exactamente 10 dígitos.');
      return false;
    }

    // Validar que el nombre contenga solo letras
    if (!validarTexto(Nombre)) {
      alert('El nombre debe contener solo letras.');
      return false;
    }

    // Validar el formato de correo electrónico
    if (!validarCorreoElectronico(Email)) {
      alert('Ingrese un correo electrónico válido.');
      return false;
    }

    return true;
  };
  const resetState = () => {
    setRuc("");
    setNombre("");
    setEmail("");
    setContacto("");
    setDireccion("");
  };

  // Effect to reset the state when the "Agregar proveedores" modal is shown
  useEffect(() => {
    if (showModal) {
      resetState();
    }
  }, [showModal]);
  
  //efecto para obtener al cliente por el ID
  useEffect(() => {
    if (id) {
        getProveedorById();
    }
  },);

const nuevoProveedor = async (e) => {
    e.preventDefault();
    // Validar los datos
  if (!validarFormulario()) {
    return;
  }
    e.preventDefault();
    await axios.post(URI, {
        PROV_RUC: Ruc,
        PROV_NOMBRE: Nombre,
        PROV_EMAIL: Email,
        PROV_CONTACTO: Contacto,
        PROV_DIRECCION: Direccion,
        PROV_ESTADO: "Activo",
    });
    setShowModal(false);
    getProveedores();
  };
//FUNCION PARA ACTUALIZAR LOS DATOS DEL CLIENTE
const update = async (e) => {
  e.preventDefault();
  // Validar los datos
  if (!validarFormulario()) {
    return;
  }

  try {
    const idAux = localStorage.getItem("id");
    await axios.put(URI + idAux, {
      PROV_RUC: Ruc,
      PROV_NOMBRE: Nombre,
      PROV_EMAIL: Email,
      PROV_CONTACTO: Contacto,
      PROV_DIRECCION: Direccion,
      PROV_ESTADO: Estado,
    });
    setEditShowModal(false);
    getProveedores();
  } catch (error) {
    console.error("Error al Actualizar Datos del Proveedor:", error);
  }
};
  //funcion para cargar los datos del cliente por el ID enviado mediante la seleccion del boton editar de las tablas
  const getProveedorById = async () => {
    try {
      var idAux = localStorage.getItem("id");
      const res = await axios.get(URI + idAux);

      if (res.data.length > 0) {
        setRuc(res.data[0].PROV_RUC);
        setNombre(res.data[0].PROV_NOMBRE);
        setEmail(res.data[0].PROV_EMAIL);
        setContacto(res.data[0].PROV_CONTACTO);
        setDireccion(res.data[0].PROV_DIRECCION);
        setEstado(res.data[0].PROV_ESTADO);
          
      } else {
        console.log("No se encontró ningún proveedor con el ID: " + idAux);
      }
    } catch (error) {
      // Manejo de errores
      console.error("Error al obtener los datos del proveedor:", error);
    }
  };

  //funcion para obtener todos los clientes
  const getProveedores = async () => {
    const res = await axios.get(URI);
    setProveedores(res.data);
  };
  //funcion para alterar el estado del cliente pasamos de activo a inactivo
  const deleteProveedores = async (id) => {
    await axios.put(URI + id, {
      PROV_ESTADO: "Inactivo",
    });
    getProveedores();
  };
  //funcion para pasar el estado del cliente a activo
  const ActivarProveedores= async (id) => {
    await axios.put(URI + id, {
      PROV_ESTADO: "Activo",
    });
    getProveedores();
  };
  // Renderizar la tabla con los proveedores
  const renderProveedoresTabla = () => {
    const filteredProveedores = proveedores.filter((proveedor) => {
        return (
        proveedor.PROV_RUC.toLowerCase().includes(searchTerm.toLowerCase()) &&
        proveedor.PROV_RUC !== "9999999999" &&
        (selectedProveedorName === "" ||
          proveedor.PROV_NOMBRE.toLowerCase().includes(selectedProveedorName.toLowerCase())) &&
        (selectedEstado === "" || proveedor.PROV_ESTADO === selectedEstado)
      );
    });

    // Separar proveedores con estado "Inactivo" y colocarlos al final de la lista
    const proveedoressActivos = filteredProveedores.filter(
      (proveedor) => proveedor.PROV_ESTADO === "Activo"
    );
    const proveedoressInactivos = filteredProveedores.filter(
        (proveedor) => proveedor.PROV_ESTADO=== "Inactivo"
    );
    const proveedoresOrdenados = [...proveedoressActivos, ...proveedoressInactivos];


    //retorna la tabla con todos los proveedores
    return (
      <table className="centrar-tabla">
        <thead>
          <tr>
            <th>RUC</th>
            <th>NOMBRE</th>
            <th>EMAIL</th>
            <th>CONTACTO</th>
            <th>DIRECCION</th>
            <th>ESTADO</th>
            <th>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {proveedoresOrdenados.map((proveedor,index) => (
            <tr
              key={proveedor.PROV_ID} // Add a unique key prop here
              style={
                proveedor.PROV_ESTADO === "Inactivo"
                  ? { backgroundColor: "pink" }
                  : {}
              }
            >
              <td> {proveedor.PROV_RUC} </td>
              
              <td> {proveedor.PROV_NOMBRE} {" "}</td>
              
              <td> {proveedor.PROV_EMAIL} </td>
              <td> {proveedor.PROV_CONTACTO} </td>
              <td> {proveedor.PROV_DIRECCION} </td>
              <td> {proveedor.PROV_ESTADO} </td>
              <td>
                <button
                  onClick={() => {
                    localStorage.setItem("id", proveedor.PROV_ID);
                    getProveedorById();
                    setEditShowModal(true);
                  }}
                  className="btn btn-info"
                >
                  <i className="fas fa-edit"></i>
                </button>
                {proveedor.PROV_ESTADO === "Activo" && (
                  //recorremos por cliente y solo si el estado es activo se muestra esta seccion o boton
                  <>
                    <button
                      onClick={() => deleteProveedores(proveedor.PROV_ID)}
                      className="btn btn-warning"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </>
                )}
                {proveedor.PROV_ESTADO === "Inactivo" && (
                  //recorremos por cliente y solo si el estado es inactivo se muestra esta seccion o boton
                  <>
                    <button
                      onClick={() => ActivarProveedores(proveedor.PROV_ID)}
                      className="btn btn-success"
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
        <h1>GESTIÓN DE PROVEEDORES</h1>
      </div>
      <button className="custom-button" onClick={() => setShowModal(true)}>
        Agregar proveedores{" "}
        <i className="fas fa-add" style={{ marginLeft: "5px" }}></i>
      </button>
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
          placeholder="Buscar por RUC"
        />
      </div>
      <br />
      <select
        className="combobox"
        id="proveedor"
        value={selectedProveedorName}
        onChange={(e) => setSelectedProveedorName(e.target.value)}
      >
        <option value="">Buscar por Proveedor</option>
        {proveedores.map((proveedor) => (
          <option key={proveedor.PROV_ID} value={proveedor.PROV_NOMBRE}>
            {proveedor.PROV_NOMBRE}
          </option>
        ))}
      </select>{" "}
      <select
        className="combobox"
        id="estado"
        value={selectedEstado}
        onChange={(e) => setSelectedEstado(e.target.value)}
      >
        <option value="">Filtrar por Estado</option>
        <option value="Activo">Activo</option>
        <option value="Inactivo">Inactivo</option>
      </select>
      {renderProveedoresTabla()}

      {showModal && (
        <div className="modal" style={{ zIndex: "100" }}>
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <h2>Agregar Proveedor</h2>
            <form onSubmit={nuevoProveedor}>
              <div className="form-group">
                <label htmlFor="cedula">RUC:</label>
                <input
                  type="text"
                  id="ruc"
                  name="ruc"
                  maxLength={13}
                  placeholder="Ingrese numero de RUC"
                  onChange={handleNumeroChange}
                  value={Ruc}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="Nombre">Nombre:</label>
                <input
                  type="text"
                  id="Nombre"
                  name="Nombre"
                  placeholder="Ingrese nombre"
                  onChange={handleTextChange}
                  value={Nombre}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="telefono">Teléfono:</label>
                <input
                  type="telf"
                  id="telefono"
                  name="telefono"
                  maxLength={10}
                  placeholder="Ingrese telefono"
                  onChange={handleNumeroChange}
                  value={Contacto}
                  required
                />
              </div>
              <div className="form-group">
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
              <div className="form-group">
                <label htmlFor="correoElectronico">Correo Electrónico:</label>
                <input
                  type="email"
                  id="correoElectronico"
                  name="correoElectronico"
                  placeholder="Ingrese correo electronico"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button className="custom-button" type="submit">
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
            <h2>Actualizar Proveedor</h2>
            <form onSubmit={update}>
              <div className="form-group">
                <label htmlFor="Ruc">RUC:</label>
                <input
                  type="text"
                  id="ruc"
                  name="ruc"
                  maxLength={13}
                  placeholder="Ingrese numero de RUC"
                  onChange={handleNumeroChange}
                  value={Ruc}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="Nombre">Nombre:</label>
                <input
                  type="text"
                  id="Nombre"
                  name="Nombre"
                  placeholder="Ingrese nombre"
                  onChange={handleTextChange}
                  value={Nombre}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="telefono">Teléfono:</label>
                <input
                  type="telf"
                  id="telefono"
                  name="telefono"
                  maxLength={10}
                  placeholder="Ingrese telefono"
                  onChange={handleNumeroChange}
                  value={Contacto}
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
              <button className="custom-button" type="submit">
                Actualizar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistroProveedor;
