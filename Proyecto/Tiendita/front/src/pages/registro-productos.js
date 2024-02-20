import React from "react";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
//url's para conectar a cada tabla de la base de datos
const URI = "http://localhost:5000/producomplete/";
const URI2 = "http://localhost:5000/productos/";
const URI3 = "http://localhost:5000/proveedores/";
const URI4 = "http://localhost:5000/categoria/";
const URI5 = "http://localhost:5000/inventario/";

const RegistroProductos = () => {
  useEffect(() => {
    document.title = "PRODUCTOS"
    
});
  const [selectedCategoryName, setSelectedCategoryName] = useState(""); // Estado para el nombre de la categoría seleccionada
  const [selectedProveedorName, setSelectedProveedorName] = useState(""); // Estado para el nombre del proveedor seleccionado
  const [selectedEstado, setSelectedEstado] = useState(""); // Estado para filtrar por estado
  // Estado para controlar si se muestra el modal o no
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setEditShowModal] = useState(false);
  const [showModalInventario, setShowModalInventario] = useState(false);

  const [searchTerm, setSearchTerm] = useState(""); //estado que busca al producto por el nombre
  //AGREGAMOS ESTADOS PARA CARGAR LOS PRODUCTOS EN UN ARREGLO
  const [categorias, setCategorias] = useState([]);
  const [proveedor, setProveedor] = useState([]);
  const [productos, setProductos] = useState([]);
  //ESTADOS PARA LOS DATOS DE LOS PRODUCTOS
  const [Nombre, setNombre] = useState("");
  const [Estado, setEstado] = useState("");
  const [Descripcion, setDescripcion] = useState("");
  const [Stock, setStock] = useState("");
  const [Precio, setPrecio] = useState("");
  const [Iva, setIva] = useState("Aplica");
  const [Proid, setProid] = useState("");
  //DATOS DEL PROOVEDOR
  const [Provid, setProvid] = useState("");
  const [ProvNombre, setProvNombre] = useState("");
  //DATOS DE LA CATEGORIA
  const [CatNombre, setCatNombre] = useState("");
  const [Catid, setCatid] = useState("");
  //DATOS PARA INGRESAR EL INVENTARIO
  const [Cantidad, setCantidad] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getProductos();
  }, []);

    //Validar si el valor es un texto
    const validarTexto = (value) => /^[A-Za-z\s]+$/.test(value);

    const handleTextChange = (e) => {
      const value = e.target.value;
      const inputName = e.target.name;
    
      
    
      if (inputName === "Nombre") {
        // No es necesario eliminar los números con la expresión regular
        setNombre(value);
      }
    };
    
  
//FUNCION PARA ACTUALIZAR LOS DATOS DE LOS PRODUCTOS POR ID 
  const update = async (e) => {
    e.preventDefault();
    var idAux = localStorage.getItem("id");
    await axios.put(URI2 + idAux, {
      PRO_NOMBRE: Nombre,
      PROV_ID: Provid,
      CAT_ID: Catid,
      PRO_DESCRIPCION: Descripcion,
      PRO_STOCK: Stock,
      PRO_PRECIO: Precio,
      PRO_IVA: Iva,
      PRO_ESTADO: Estado,
    });
    setEditShowModal(false);
    getProductos();
  };

  useEffect(() => {
    getProductoById();
  }, []);
//FUNCION PARA AGREGAR UN NUEVO PRODUCTO
  const nuevoProducto = async (e) => {
    e.preventDefault();
    await axios.post(URI2, {
      PRO_NOMBRE: Nombre,
      PROV_ID: Provid,
      CAT_ID: Catid,
      PRO_DESCRIPCION: Descripcion,
      PRO_STOCK: 0,
      PRO_PRECIO: Precio,
      PRO_IVA: Iva,
      PRO_ESTADO: "Activo",
    });
    setShowModal(false);
    getProductos();
    
  };
  //FUNCION PARA OBTENER UN PRODUCTO POR EL ID

  const getProductoById = async () => {
    try {
      var idAux = localStorage.getItem("id");
      const res = await axios.get(URI2 + idAux);

      if (res.data.length > 0) {
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
//FUNCION PARA  OBTENER TODOS LOS PRODUCTOS DE LA BASE DE DATOS
  const getProductos = async () => {
    const res = await axios.get(URI);
    setProductos(res.data);
  };
//FUNCION QUE ELIMINA AL PRODUCTO PASA DE ACTIVO A INACTIVO AL PRODUCTO
  const deleteProductos = async (id) => {
    await axios.put(URI2 + id, {
      PRO_ESTADO: "Inactivo",
    });
    getProductos();
  };
  //FUNCION QUE ACTIVA AL PRODCUTO PASA DE INACTIVO A ACTIVO
  const ActivarProductos = async (id) => {
    await axios.put(URI2 + id, {
      PRO_ESTADO: "Activo",
    });
    getProductos();
  };
  /////////////////////////////////////////////////////////77
//CATEGORIAS
  useEffect(() => {
    getCategorias();
  }, []);
//OBTENER TODAS LAS CATEGORIAS DE LA BASE DE DATOS
  const getCategorias = async () => {
    const res = await axios.get(URI4);
    setCategorias(res.data);
    console.log(res.data);
  };

  ////////////////////////////////////////////////////////////////////////
//OBTENER TODOS LOS PROVEEDORES DESDE LA BASE DE DATOS
  useEffect(() => {
    getProveedor();
  }, []);

  const resetState = () => {
    setNombre("");
    setProvid("");
    setCatid("");
    setDescripcion("");
    setPrecio("");
  };

  // Effect to reset the state when the "Agregar proveedores" modal is shown
  useEffect(() => {
    if (showModal) {
      resetState();
    }
  }, [showModal]);

  const getProveedor = async () => {
    const res = await axios.get(URI3);
    setProveedor(res.data);
    console.log(res.data);
  };

  //////////////////////////////////////////////////////////
 //OBTENER LA FECHA 
  const fechaActual = new Date();
  const anio = fechaActual.getFullYear();
  const mes = fechaActual.getMonth() + 1; // Los meses en JavaScript van de 0 a 11
  const dia = fechaActual.getDate();

  const fechaActualFormateada = `${anio}-${mes}-${dia}`;
  //console.log(fechaActualFormateada);
/////////////////////////////////////////////////
//FUNCION PARA INGRESAR INVENTARIO DEL PRODUCTO
  const inventario = async (e) => {
    e.preventDefault();
    await axios.post(URI5, {
      PRO_ID: localStorage.getItem("id"),
      INV_CANTIDAD: Cantidad,
      iNV_FECHA: fechaActualFormateada,
    });
    setShowModalInventario(false);
    getProductos();
  };

  // Renderizar la tabla con los productos
  const renderProductosTabla = () => {
    const filterProductos = (
      productos,
      searchTerm,
      selectedCategoryName,
      selectedProveedorName,
      selectedEstado
    ) => {
      return productos.filter((producto) => {
        const nombreIncluido = producto.PRO_NOMBRE.toLowerCase().includes(
          searchTerm.toLowerCase()
        );
        const categoriaCoincide =
          selectedCategoryName === "" || producto.CAT_NOMBRE === selectedCategoryName;
        const proveedorCoincide =
          selectedProveedorName === "" || producto.PROV_NOMBRE === selectedProveedorName;
        const estadoCoincide =
          selectedEstado === "" || producto.PRO_ESTADO === selectedEstado;
        return nombreIncluido && categoriaCoincide && proveedorCoincide && estadoCoincide;
      });
    };

    const filteredProductos = filterProductos(
      productos,
      searchTerm,
      selectedCategoryName,
      selectedProveedorName,
      selectedEstado // Pasa el valor del estado seleccionado
    );
    
    //CONSTANTES QUE CLISIFICAN LOS PRODUCTOS SI ESTAN ACTIVOS O INACTIVOS
    const ProductosActivos = filteredProductos.filter(
      (producto) => producto.PRO_ESTADO === "Activo"
    );
    const ProductosInactivos = filteredProductos.filter(
      (producto) => producto.PRO_ESTADO === "Inactivo"
    );
    //constante para ordenar los productos
    const ProductosOrdenados = [...ProductosActivos, ...ProductosInactivos];
//TABLA QUE MUESTRA TODOS LOS PRODUCTOS CON LAS OPCIONES RESPECTIVAS PARA HACER CRUD
    return (
      <table className="centrar-tabla">
        <thead>
          <tr>
            <th>NOMBRE</th>
            <th>PROVEEDOR</th>
            <th>CATEGORIA</th>
            <th>DESCRIPCION</th>
            <th>STOCK</th> {/* Cambiar ubicación de STOCK y PRECIO */}
            <th>PRECIO</th> {/* Cambiar ubicación de STOCK y PRECIO */}
            <th>IVA</th>
            <th>ESTADO</th>
            <th>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {ProductosOrdenados.map((producto, index) => (//RECORRE EL ARREGLO DE PRODUCTOS ORDENADOS E IMPRIME EN  LA TABLA
            <tr
              key={producto.PRO_ID}
              style={{
                backgroundColor: producto.PRO_ESTADO === "Inactivo" ? "pink" : producto.PRO_STOCK === 0 ? "red" : "transparent"
              }}
            >
              <td> {producto.PRO_NOMBRE} </td>
              <td> {producto.PROV_NOMBRE} </td>
              <td> {producto.CAT_NOMBRE} </td>
              <td> {producto.PRO_DESCRIPCION} </td>
              <td> {producto.PRO_STOCK} </td> {/* Correcto: STOCK */}
              <td> {producto.PRO_PRECIO} </td> {/* Correcto: PRECIO */}
              <td> {producto.PRO_IVA} </td>
              <td> {producto.PRO_ESTADO} </td>
              <td>
                <button
                  onClick={() => {
                    localStorage.setItem("id", producto.PRO_ID);//ENVIA EL ID DEL PRODUCTO A UNA VARIABLE EN LOCAL STORAGE
                    getProductoById(producto.PRO_ID);//LLAMA A LA FUNCION PARA OBTENER LOS PRODUCTOS POR EL ID
                    setEditShowModal(true);//ABRE EL MODAL PARA ACTUALIZAR LOS DATOS DEL PRODUCTO
                  }}
                  className="btn btn-info"
                >
                  <i className="fas fa-edit"></i>
                </button>
                {producto.PRO_ESTADO === "Activo" && (//SI EL ESTADO DEL PRODUCTO ES ACTIVO SE MUESTRA ESTOS BOTONES
                  <>
                    <button
                      onClick={() => deleteProductos(producto.PRO_ID)}
                      className="btn btn-warning"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                    <button
                      onClick={() => {
                        localStorage.setItem("id", producto.PRO_ID);
                        getProductoById(producto.PRO_ID);
                        setShowModalInventario(true);
                      }}
                      className="btn btn-dark"
                    >
                      <i class="fa fa-upload" aria-hidden="true"></i>
                    </button>
                  </>
                )}
                {producto.PRO_ESTADO === "Inactivo" && (//SI EL ESTADO DEL PRODUCTO ES INACTIVO SE MUESTRAN ESTOS BOTONES
                  <>
                    <button
                      onClick={() => ActivarProductos(producto.PRO_ID)}
                      className="btn btn-success"
                    >
                      <i className="fas fa-check"></i>
                    </button>
                    <button
                      disabled
                      onClick={() => {
                        localStorage.setItem("id", producto.PRO_ID);//GUARDA EL ID DEL PRODUCTO EN UN LOCAL STORAGE
                        getProductoById(producto.PRO_ID);//OBTIENE EL PRODUCTO POR EL ID
                        setShowModalInventario(true);//ABRE EL MODAL PARA INGRESAR CANTIDADES DE PRODUCTO AL INVENTARIO
                      }}
                      className="btn btn-dark"
                    >
                      <i class="fa fa-upload" aria-hidden="true"></i>
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
//RETORNA EL CONTENEDOR PRINCIPAL
  return (
    <div className="container" style={{ textAlign: "center" }}>
      <div
      style={{ textAlign: "center", marginTop: "25px", marginBottom: "25px" }}>
        <h1>GESTIÓN DE PRODUCTOS</h1>
      </div>
      
      <div className="centrar-pantalla">
        <button className="custom-button" onClick={() => setShowModal(true)}>
          Agregar Producto{" "}
          <i className="fas fa-add" style={{ marginLeft: "5px" }}></i>
        </button>
      </div>

      <input
        type="text"
        id="search"
        name="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar por nombre"
      />
      {"  "}
      <br />
      <select
        id="categoria"
        className="combobox"
        value={selectedCategoryName}
        onChange={(e) => setSelectedCategoryName(e.target.value)}
      >
        <option value="">Buscar por Categoria</option>
        {categorias.map((categoria) => (
          <option key={categoria.CAT_ID} value={categoria.CAT_NOMBRE}>
            {categoria.CAT_NOMBRE}
          </option>
        ))}
      </select>{" "}
      <select
        className="combobox"
        id="proveedor"
        value={selectedProveedorName}
        onChange={(e) => setSelectedProveedorName(e.target.value)}
      >
        <option value="">Buscar por Proveedor</option>
        {proveedor.map((proveedor) => (
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

      {renderProductosTabla()}
      {/* Modal para el formulario */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <h2>Agregar Producto</h2>
            <form onSubmit={nuevoProducto} className="product-form">
              <div className="form-group">
                <label htmlFor="nombre">Nombre:</label>
                <input
                  type="text"
                  id="Nombre"
                  name="Nombre"
                  value={Nombre}
                  placeholder="Ingrese nombre producto"
                  onChange={handleTextChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="proveedor">Proveedor:</label>
                <select
                  id="proveedor"
                  onChange={(e) => setProvid(e.target.value)}
                >
                  <option value="">Selecciona un proveedor</option>
                  {proveedor.map((proveedor) => (
                    <option
                      key={proveedor.PROV_ID}
                      selected={proveedor.PROV_ID === Provid}
                      value={proveedor.PROV_ID}
                    >
                      {proveedor.PROV_NOMBRE}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="categoria">Categoria:</label>
                <select
                  id="categoria"
                  onChange={(e) => setCatid(e.target.value)}
                >
                  <option value="">Selecciona una Categoria</option>
                  {categorias.map((categoria) => (
                    <option
                      key={categoria.CAT_ID}
                      value={categoria.CAT_ID}
                      selected={categoria.CAT_ID === Catid}
                    >
                      {categoria.CAT_NOMBRE}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="descripcion">Descripcion:</label>
                <input
                  type="text"
                  id="descripcion"
                  name="descripcion"
                  placeholder="Ingrese una descripcion"
                  value={Descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="precio">Precio:</label>
                <input
                  type="number"
                  id="Precio"
                  name="Precio"
                  value={Precio}
                  placeholder="Ingrese el precio"
                  onChange={(e) => setPrecio(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>IVA:</label>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="iva"
                      value="Aplica"
                      checked={Iva === "Aplica"}
                      onChange={() => setIva("Aplica")}
                    />
                    Aplica
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="iva"
                      value="No Aplica"
                      checked={Iva === "No Aplica"}
                      onChange={() => setIva("No Aplica")}
                    />
                    No aplica
                  </label>
                </div>
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
            <h2>Actualizar Producto</h2>
            <form onSubmit={update}>
              <div className="form-group">
                <label htmlFor="nombre">Nombre:</label>
                <input
                  type="text"
                  id="Nombre"
                  name="Nombre"
                  value={Nombre}
                  onChange={handleTextChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="proveedor">Proveedor:</label>
                <select
                  id="proveedor"
                  onChange={(e) => setProvid(e.target.value)}
                >
                  <option value={ProvNombre}>Selecciona un proveedor</option>
                  {proveedor.map((proveedor) => (
                    <option
                      key={proveedor.PROV_ID}
                      value={proveedor.PROV_ID}
                      selected={proveedor.PROV_ID === Provid}
                    >
                      {proveedor.PROV_NOMBRE}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="categoria">Categoria:</label>
                <select
                  id="categoria"
                  onChange={(e) => setCatid(e.target.value)}
                >
                  <option value={CatNombre}>Selecciona una Categoria</option>
                  {categorias.map((categoria) => (
                    <option
                      key={categoria.CAT_ID}
                      value={categoria.CAT_ID}
                      selected={categoria.CAT_ID === Catid}
                    >
                      {categoria.CAT_NOMBRE}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="descripcion">Descripcion:</label>
                <input
                  type="text"
                  id="descripcion"
                  name="descripcion"
                  value={Descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="precio">Precio:</label>
                <input
                  type="number"
                  id="precio"
                  name="precio"
                  value={Precio}
                  onChange={(e) => setPrecio(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>IVA:</label>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="iva"
                      value="Aplica"
                      checked={Iva === "Aplica"}
                      onChange={() => setIva("Aplica")}
                    />
                    Aplica
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="iva"
                      value="No Aplica"
                      checked={Iva === "No Aplica"}
                      onChange={() => setIva("No Aplica")}
                    />
                    No aplica
                  </label>
                </div>
              </div>

              <button className="custom-button" type="submit">
                Actualizar
              </button>
            </form>
          </div>
        </div>
      )}
      {/* Modal para el formulario */}
      {showModalInventario && (
        <div className="modal">
          <div className="modal-content">
            <span
              className="close"
              onClick={() => setShowModalInventario(false)}
            >
              &times;
            </span>
            <h2>GESTION DE INVENTARIO DEL PRODUCTO</h2>
            <h2>{Nombre}</h2>
            <h4>Id del prooveedor:{" " + Provid}</h4>
            <form onSubmit={inventario} className="product-form">
              <div className="form-group">
                <label htmlFor="Cantidad">Cantidad del Producto:</label>
                <input
                  min={0}
                  type="number"
                  id="cantidad"
                  name="cantidad"
                  onChange={(e) => setCantidad(e.target.value)}
                  required
                />
              </div>

              <button className="custom-button" type="submit">
                Guardar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistroProductos;