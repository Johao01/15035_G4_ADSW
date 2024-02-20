const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;
const cors = require("cors");
app.use(cors());
// Configuración de body-parser para analizar JSON en las solicitudes POST
app.use(bodyParser.json());

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "tienda",
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Conexión a la base de datos establecida");
});

app.get("/alert", (req, res) => {
  const sql = " select * from producto where pro_stock<=5;";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Rutas para la tabla 'cliente'
app.get("/clientes", (req, res) => {
  const sql = "SELECT * FROM cliente";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.get("/clientes/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM cliente WHERE CLI_ID = ?";
  db.query(sql, id, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post("/clientes", (req, res) => {
  const nuevoCliente = req.body;
  const sql = "INSERT INTO cliente SET ?";
  db.query(sql, nuevoCliente, (err, result) => {
    if (err) throw err;
    res.send("Cliente creado exitosamente");
  });
});

app.put("/clientes/:id", (req, res) => {
  const { id } = req.params;
  const datosActualizados = req.body;
  const sql = "UPDATE cliente SET ? WHERE CLI_ID = ?";
  db.query(sql, [datosActualizados, id], (err, result) => {
    if (err) throw err;
    res.send("Cliente actualizado exitosamente");
  });
});

app.delete("/clientes/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM cliente WHERE CLI_ID = ?";
  db.query(sql, id, (err, result) => {
    if (err) throw err;
    res.send("Cliente eliminado exitosamente");
  });
});

app.get("/producomplete", (req, res) => {
  const sql =
    "SELECT * FROM producto NATURAL JOIN categoria NATURAL JOIN proovedor";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.get("/inventario", (req, res) => {
  const sql =
    "SELECT * FROM inventario NATURAL JOIN producto NATURAL JOIN proovedor";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post("/inventario", (req, res) => {
  const nuevoInventario = req.body;
  const sql = "INSERT INTO inventario SET ?";
  db.query(sql, nuevoInventario, (err, result) => {
    if (err) throw err;
    res.send("Producto ingresado existencias exitosamente");
  });
});

app.get("/categoria", (req, res) => {
  const sql = "SELECT * FROM categoria";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Obtener un producto por su ID
app.get("/categoria/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM categoria WHERE CAT_ID = ?";
  db.query(sql, id, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Crear un nuevo producto
app.post("/categoria", (req, res) => {
  const nuevaCategoria = req.body;
  const sql = "INSERT INTO categoria SET ?";
  db.query(sql, nuevaCategoria, (err, result) => {
    if (err) throw err;
    res.send("Categoria creada exitosamente");
  });
});

// Actualizar un producto por su ID
app.put("/categoria/:id", (req, res) => {
  const { id } = req.params;
  const datosActualizados = req.body;
  const sql = "UPDATE categoria SET ? WHERE CAT_ID = ?";
  db.query(sql, [datosActualizados, id], (err, result) => {
    if (err) throw err;
    res.send("Categoria actualizado exitosamente");
  });
});

// Eliminar un producto por su ID
app.delete("/categoria/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM categoria WHERE CAT_ID = ?";
  db.query(sql, id, (err, result) => {
    if (err) throw err;
    res.send("Categoria eliminado exitosamente");
  });
});

// Rutas para la tabla 'producto'

// Obtener todos los productos
app.get("/productos", (req, res) => {
  const sql = "SELECT * FROM producto";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Obtener un producto por su ID
app.get("/productos/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM producto WHERE PRO_ID = ?";
  db.query(sql, id, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Crear un nuevo producto
app.post("/productos", (req, res) => {
  const nuevoProducto = req.body;
  const sql = "INSERT INTO producto SET ?";
  db.query(sql, nuevoProducto, (err, result) => {
    if (err) throw err;
    res.send("Producto creado exitosamente");
  });
});

// Actualizar un producto por su ID
app.put("/productos/:id", (req, res) => {
  const { id } = req.params;
  const datosActualizados = req.body;
  const sql = "UPDATE producto SET ? WHERE PRO_ID = ?";
  db.query(sql, [datosActualizados, id], (err, result) => {
    if (err) throw err;
    res.send("Producto actualizado exitosamente");
  });
});

// Eliminar un producto por su ID
app.delete("/productos/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM producto WHERE PRO_ID = ?";
  db.query(sql, id, (err, result) => {
    if (err) throw err;
    res.send("Producto eliminado exitosamente");
  });
});

app.get("/facturas", (req, res) => {
  const sql = "SELECT * FROM factura";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Obtener un proveedor por su ID
app.get("/facturas/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM factura WHERE FAC_ID = ?";
  db.query(sql, id, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Crear un nuevo proveedor
app.post("/facturas", (req, res) => {
  const nuevaFactura = req.body;
  const sql = "INSERT INTO factura SET ?";

  db.query(sql, nuevaFactura, (err, result) => {
    if (err) {
      console.error("Error al insertar la factura:", err);
      res.status(500).send("Error al crear la factura");
    } else {
      const facturaId = result.insertId; // Obtenemos el ID de la factura creada
      console.log("ID de la factura creada:", facturaId);
      res.status(201).json({ facturaId }); // Enviamos el ID de la factura como respuesta al cliente
    }
  });
});

// Actualizar un proveedor por su ID
app.put("/facturas/:id", (req, res) => {
  const { id } = req.params;
  const datosActualizados = req.body;
  const sql = "UPDATE factura SET ? WHERE FAC_ID = ?";
  db.query(sql, [datosActualizados, id], (err, result) => {
    if (err) throw err;
    res.send("Factura actualizada exitosamente");
  });
});

// Eliminar un proveedor por su ID
app.delete("/facturas/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM factura WHERE FAC_ID = ?";
  db.query(sql, id, (err, result) => {
    if (err) throw err;
    res.send("Factura eliminada exitosamente");
  });
});

// Rutas para la tabla 'proovedor'

// Obtener todos los proveedores
app.get("/proveedores", (req, res) => {
  const sql = "SELECT * FROM proovedor";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Obtener un proveedor por su ID
app.get("/proveedores/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM proovedor WHERE PROV_ID = ?";
  db.query(sql, id, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Crear un nuevo proveedor
app.post("/proveedores", (req, res) => {
  const nuevoProveedor = req.body;
  const sql = "INSERT INTO proovedor SET ?";
  db.query(sql, nuevoProveedor, (err, result) => {
    if (err) throw err;
    res.send("Proveedor creado exitosamente");
  });
});

// Actualizar un proveedor por su ID
app.put("/proveedores/:id", (req, res) => {
  const { id } = req.params;
  const datosActualizados = req.body;
  const sql = "UPDATE proovedor SET ? WHERE PROV_ID = ?";
  db.query(sql, [datosActualizados, id], (err, result) => {
    if (err) throw err;
    res.send("Proveedor actualizado exitosamente");
  });
});

// Eliminar un proveedor por su ID
app.delete("/proveedores/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM proovedor WHERE PROV_ID = ?";
  db.query(sql, id, (err, result) => {
    if (err) throw err;
    res.send("Proveedor eliminado exitosamente");
  });
});

////////////////////////////////
app.get("/detalles", (req, res) => {
  const sql = "SELECT * FROM detalle";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Obtener un proveedor por su ID
app.get("/detalles/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM detalle WHERE DET_ID = ?";
  db.query(sql, id, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Crear un nuevo proveedor
app.post("/detalles", (req, res) => {
  const nuevoProveedor = req.body;
  const sql = "INSERT INTO detalle SET ?";
  db.query(sql, nuevoProveedor, (err, result) => {
    if (err) throw err;
    res.send("Detalle creado exitosamente");
  });
});

// Actualizar un proveedor por su ID
app.put("/detalles/:id", (req, res) => {
  const { id } = req.params;
  const datosActualizados = req.body;
  const sql = "UPDATE detalle SET ? WHERE DET_ID = ?";
  db.query(sql, [datosActualizados, id], (err, result) => {
    if (err) throw err;
    res.send("Detalle actualizado exitosamente");
  });
});

// Eliminar un proveedor por su ID
app.delete("/detalles/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM detalle WHERE DET_ID = ?";
  db.query(sql, id, (err, result) => {
    if (err) throw err;
    res.send("Detalle eliminado exitosamente");
  });
});
app.get("/detallesFactura", (req, res) => {
  const sql = "SELECT * FROM detalle NATURAL JOIN producto";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.get("/detallesFactura/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM detalle NATURAL JOIN producto WHERE FAC_ID= ? ";
  db.query(sql, id, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.get("/clientesCed/:cedula", (req, res) => {
  const { cedula } = req.params;
  const sql = "SELECT * FROM cliente WHERE CLI_CEDULA = ?";
  db.query(sql, cedula, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.get("/impresionFactura/:fac_id", (req, res) => {
  const { fac_id } = req.params;
  const sql =
    "SELECT * from cliente NATURAL JOIN factura NATURAL JOIN producto NATURAL JOIN detalle where fac_id=?";
  db.query(sql, fac_id, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.get("/impresionFactura/:fac_id", (req, res) => {
  const { fac_id } = req.params;
  const sql =
    "SELECT * from cliente NATURAL JOIN factura NATURAL JOIN producto NATURAL JOIN detalle where fac_id=?";
  db.query(sql, fac_id, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//Consultar el total en un rango de fecha
app.get("/impresionFactura/informe-ventas/:inicio/:final", (req, res) => {
  const { inicio, final } = req.params;
  const sql = `SELECT SUM(FAC_TOTAL) AS TOTAL, COUNT(*) AS CANTIDAD FROM factura WHERE FAC_FECHA BETWEEN ? AND ?`;
  db.query(sql, [inicio, final], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
