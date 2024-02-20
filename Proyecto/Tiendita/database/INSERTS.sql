/*==============================================================*/
/* PROVEEDORES                                          */
/*==============================================================*/

INSERT INTO proovedor (PROV_RUC, PROV_NOMBRE, PROV_EMAIL, PROV_CONTACTO, PROV_DIRECCION, PROV_ESTADO)
VALUES ('1751311836001','NatureSA','naturesa@gmail.com','0983903010','Cayambe','Activo');

INSERT INTO proovedor (PROV_RUC, PROV_NOMBRE, PROV_EMAIL, PROV_CONTACTO, PROV_DIRECCION, PROV_ESTADO)
VALUES ('1753868577001','NestleSA','nestlesa@gmail.com','0983412634','Quito','Activo');

INSERT INTO proovedor (PROV_RUC, PROV_NOMBRE, PROV_EMAIL, PROV_CONTACTO, PROV_DIRECCION, PROV_ESTADO)
VALUES ('0503641219001','CORAGROFRUT S.A.','corafrut@gmail.com','0991881762','Guayaquil','Activo');

INSERT INTO proovedor (PROV_RUC, PROV_NOMBRE, PROV_EMAIL, PROV_CONTACTO, PROV_DIRECCION, PROV_ESTADO)
VALUES ('0503699605001','Arca Continental','arcacontsa@gmail.com','1800262226','Guayaquil','Activo');

INSERT INTO proovedor (PROV_RUC, PROV_NOMBRE, PROV_EMAIL, PROV_CONTACTO, PROV_DIRECCION, PROV_ESTADO)
VALUES ('1756266597001','Cordialsa','cordial@cordialsa.com.ec','1800110120','Quito,Av. Naciones Unidas E2-30','Activo');

INSERT INTO proovedor (PROV_RUC, PROV_NOMBRE, PROV_EMAIL, PROV_CONTACTO, PROV_DIRECCION, PROV_ESTADO)
VALUES ('1756282420001','Colombina','colombina@colombiba.com.ec','23819994','Quito,Orellana E9-195 ','Activo');

INSERT INTO proovedor (PROV_RUC, PROV_NOMBRE, PROV_EMAIL, PROV_CONTACTO, PROV_DIRECCION, PROV_ESTADO)
VALUES ('1756302780001','Pepsico','pedidos@laeuropea.com.ec','43710200','Quito','Activo');


/*==============================================================*/
/* CATEGORIAS                                          */
/*==============================================================*/


INSERT INTO categoria (CAT_NOMBRE,CAT_DESCRIPCION) VALUES ('Fruta','productos que son frutas');
INSERT INTO categoria (CAT_NOMBRE,CAT_DESCRIPCION) VALUES ('Fritura','productos que son frituras, ejemplos: doritos,ruffles,etc..');
INSERT INTO categoria (CAT_NOMBRE,CAT_DESCRIPCION) VALUES ('Lacteos','productos que son lacteos');
INSERT INTO categoria (CAT_NOMBRE,CAT_DESCRIPCION) VALUES ('Carnico','alimentos de carne, ejemplos:res,pollo,etc..');
INSERT INTO categoria (CAT_NOMBRE,CAT_DESCRIPCION) VALUES ('Embutido','alimentos embutidos, ejemplos:salchichas,nuggets,etc..');
INSERT INTO categoria (CAT_NOMBRE,CAT_DESCRIPCION) VALUES ('Dulce','dulces, ejemplos:galletas,chocolates,caramelos,etc..');
INSERT INTO categoria (CAT_NOMBRE,CAT_DESCRIPCION) VALUES ('Bebida','bebidas, ejemplos:jugos,gaseosas,etc..');
INSERT INTO categoria (CAT_NOMBRE,CAT_DESCRIPCION) VALUES ('Condimento','condimentos, ejemplos:salsas,azucar,salt,etc..');
INSERT INTO categoria (CAT_NOMBRE,CAT_DESCRIPCION) VALUES ('Helado','categoria que abarca los helados');
INSERT INTO categoria (CAT_NOMBRE,CAT_DESCRIPCION) VALUES ('Verdura','prudctos que son verduras');
INSERT INTO categoria (CAT_NOMBRE,CAT_DESCRIPCION) VALUES ('Pasta','pastas,ejemplos:fideos');
INSERT INTO categoria (CAT_NOMBRE,CAT_DESCRIPCION) VALUES ('Granos','alimentos en grano,ejemplo:arroz,frejoles,etc..');

/*==============================================================*/
/* PRODUCTOS                                            */
/*==============================================================*/

INSERT INTO producto (PROV_ID, CAT_ID, PRO_NOMBRE, PRO_DESCRIPCION, PRO_STOCK, PRO_PRECIO, PRO_IVA, PRO_ESTADO)
VALUES (1, 1, 'Manzana', 'Manzana fresca', 100, 0.50, 'No Aplica', 'Activo');

INSERT INTO producto (PROV_ID, CAT_ID, PRO_NOMBRE, PRO_DESCRIPCION, PRO_STOCK, PRO_PRECIO, PRO_IVA, PRO_ESTADO)
VALUES (3, 1, 'Naranja', 'Naranja jugosa', 150, 0.40, 'No Aplica', 'Activo');

INSERT INTO producto (PROV_ID, CAT_ID, PRO_NOMBRE, PRO_DESCRIPCION, PRO_STOCK, PRO_PRECIO, PRO_IVA, PRO_ESTADO)
VALUES (2, 6, 'Chocolate bimbo', 'Chocolate de la marca bimbo', 80, 1.20, 'Aplica', 'Activo');

INSERT INTO producto (PROV_ID, CAT_ID, PRO_NOMBRE, PRO_DESCRIPCION, PRO_STOCK, PRO_PRECIO, PRO_IVA, PRO_ESTADO)
VALUES (7, 4, 'Pollo Entero', 'Pollo fresco entero', 50, 5.00, 'No Aplica', 'Activo');

INSERT INTO producto (PROV_ID, CAT_ID, PRO_NOMBRE, PRO_DESCRIPCION, PRO_STOCK, PRO_PRECIO, PRO_IVA, PRO_ESTADO)
VALUES (6, 11, 'Fideos oriental', 'Fideos para pasta', 200, 1.50, 'No Aplica', 'Activo');

INSERT INTO producto (PROV_ID, CAT_ID, PRO_NOMBRE, PRO_DESCRIPCION, PRO_STOCK, PRO_PRECIO, PRO_IVA, PRO_ESTADO)
VALUES (5, 9, 'Helado de Vainilla', 'Helado de vainilla cremoso', 30, 2.00, 'Aplica', 'Activo');

INSERT INTO producto (PROV_ID, CAT_ID, PRO_NOMBRE, PRO_DESCRIPCION, PRO_STOCK, PRO_PRECIO, PRO_IVA, PRO_ESTADO)
VALUES (7, 7, 'Jugo de Naranja', 'Jugo natural de naranja', 100, 1.80, 'Aplica', 'Activo');

INSERT INTO producto (PROV_ID, CAT_ID, PRO_NOMBRE, PRO_DESCRIPCION, PRO_STOCK, PRO_PRECIO, PRO_IVA, PRO_ESTADO)
VALUES (7, 5, 'Salchichas juris', 'Salchichas ahumadas', 70, 3.50, 'Aplica', 'Activo');

INSERT INTO producto (PROV_ID, CAT_ID, PRO_NOMBRE, PRO_DESCRIPCION, PRO_STOCK, PRO_PRECIO, PRO_IVA, PRO_ESTADO)
VALUES (4, 3, 'Leche', 'Leche descremada', 120, 1.20, 'No Aplica', 'Activo');

INSERT INTO producto (PROV_ID, CAT_ID, PRO_NOMBRE, PRO_DESCRIPCION, PRO_STOCK, PRO_PRECIO, PRO_IVA, PRO_ESTADO)
VALUES (3, 12, 'Arroz', 'Arroz blanco grano largo', 90, 0.90, 'No Aplica', 'Activo');


INSERT INTO producto (PROV_ID, CAT_ID, PRO_NOMBRE, PRO_DESCRIPCION, PRO_STOCK, PRO_PRECIO, PRO_IVA, PRO_ESTADO)
VALUES (1, 8, 'Sal', 'Sal refinada', 200, 0.20, 'No Aplica', 'Activo');

INSERT INTO producto (PROV_ID, CAT_ID, PRO_NOMBRE, PRO_DESCRIPCION, PRO_STOCK, PRO_PRECIO, PRO_IVA, PRO_ESTADO)
VALUES (3, 10, 'Tomate', 'Tomate rojo maduro', 150, 0.30, 'No Aplica', 'Activo');

INSERT INTO producto (PROV_ID, CAT_ID, PRO_NOMBRE, PRO_DESCRIPCION, PRO_STOCK, PRO_PRECIO, PRO_IVA, PRO_ESTADO)
VALUES (5, 9, 'Helado de Chocolate', 'Helado de chocolate cremoso', 40, 2.50, 'Aplica', 'Activo');

INSERT INTO producto (PROV_ID, CAT_ID, PRO_NOMBRE, PRO_DESCRIPCION, PRO_STOCK, PRO_PRECIO, PRO_IVA, PRO_ESTADO)
VALUES (3, 10, 'Zanahoria', 'Zanahoria fresca', 100, 0.25, 'No Aplica', 'Activo');

INSERT INTO producto (PROV_ID, CAT_ID, PRO_NOMBRE, PRO_DESCRIPCION, PRO_STOCK, PRO_PRECIO, PRO_IVA, PRO_ESTADO)
VALUES (3, 12, 'Frejoles', 'Frejoles secos', 80, 0.60, 'No Aplica', 'Activo');


INSERT INTO producto (PROV_ID, CAT_ID, PRO_NOMBRE, PRO_DESCRIPCION, PRO_STOCK, PRO_PRECIO, PRO_IVA, PRO_ESTADO)
VALUES (7, 7, 'Jugo de Manzana', 'Jugo natural de manzana', 100, 2.00, 'Aplica', 'Activo');

INSERT INTO producto (PROV_ID, CAT_ID, PRO_NOMBRE, PRO_DESCRIPCION, PRO_STOCK, PRO_PRECIO, PRO_IVA, PRO_ESTADO)
VALUES (3, 3, 'Queso Crema', 'Queso crema para untar', 50, 3.50, 'Aplica', 'Activo');

INSERT INTO producto (PROV_ID, CAT_ID, PRO_NOMBRE, PRO_DESCRIPCION, PRO_STOCK, PRO_PRECIO, PRO_IVA, PRO_ESTADO)
VALUES (5, 6, 'Galletas de Vainilla', 'Galletas sabor vainilla', 120, 1.80, 'Aplica', 'Activo');


INSERT INTO producto (PROV_ID, CAT_ID, PRO_NOMBRE, PRO_DESCRIPCION, PRO_STOCK, PRO_PRECIO, PRO_IVA, PRO_ESTADO)
VALUES (2, 12, 'Arroz Integral', 'Arroz integral grano largo', 90, 1.00, 'No Aplica', 'Activo');

INSERT INTO producto (PROV_ID, CAT_ID, PRO_NOMBRE, PRO_DESCRIPCION, PRO_STOCK, PRO_PRECIO, PRO_IVA, PRO_ESTADO)
VALUES (1, 10, 'Papa', 'Papa fresca', 200, 0.25, 'No Aplica', 'Activo');

INSERT INTO producto (PROV_ID, CAT_ID, PRO_NOMBRE, PRO_DESCRIPCION, PRO_STOCK, PRO_PRECIO, PRO_IVA, PRO_ESTADO)
VALUES (3, 8, 'Azúcar', 'Azúcar refinada', 150, 0.30, 'No Aplica', 'Activo');

/*==============================================================*/
/* CLIENTES                                            */
/*==============================================================*/
INSERT INTO cliente(CLI_CEDULA, CLI_PRIMERAPELLIDO,  CLI_PRIMERNOMBRE,  CLI_CONTACTO, CLI_ESTADO)
VALUES ('9999999999', 'Final', 'Consumidor', '099999999',  'Activo');

INSERT INTO cliente (CLI_CEDULA, CLI_PRIMERAPELLIDO, CLI_SEGUNDOAPELLIDO, CLI_PRIMERNOMBRE, CLI_SEGUNDONOMBRE, CLI_EMAIL, CLI_CONTACTO, CLI_DIRECCION, CLI_FECNACIMIENTO, CLI_ESTADO)
VALUES ('0106080237', 'Perez', 'Gomez', 'Maria', 'Fernanda', 'mariaPrez@gmail.com', '0987654321', 'Calle Principal 123', '1990-05-15', 'Activo');

INSERT INTO cliente (CLI_CEDULA, CLI_PRIMERAPELLIDO, CLI_SEGUNDOAPELLIDO, CLI_PRIMERNOMBRE, CLI_SEGUNDONOMBRE, CLI_EMAIL, CLI_CONTACTO, CLI_DIRECCION, CLI_FECNACIMIENTO, CLI_ESTADO)
VALUES ('0201398229', 'Lopez','Almagro', 'Juan','Jose','jjlopealma@hotmail.com', '0976543210','Av 6 de diciembre OW23','2002-04-22', 'Activo');

INSERT INTO cliente (CLI_CEDULA, CLI_PRIMERAPELLIDO, CLI_SEGUNDOAPELLIDO, CLI_PRIMERNOMBRE, CLI_SEGUNDONOMBRE, CLI_EMAIL, CLI_CONTACTO, CLI_DIRECCION, CLI_FECNACIMIENTO, CLI_ESTADO)
VALUES ('1709026304', 'Garcia', 'Salas', 'Pedro','Jhonny', 'pedrogar@gmail.com', '0998765432','La tola','1998-01-02', 'Activo');

INSERT INTO cliente (CLI_CEDULA, CLI_PRIMERAPELLIDO, CLI_SEGUNDOAPELLIDO, CLI_PRIMERNOMBRE, CLI_SEGUNDONOMBRE, CLI_EMAIL, CLI_CONTACTO, CLI_DIRECCION, CLI_FECNACIMIENTO, CLI_ESTADO)
VALUES ('1709028128', 'Suarez','Guerrero', 'Carlos','Anthony', 'carlossrs@hotmail.com', '0965432109', 'Av. Principal 456', '1988-12-03', 'Activo');


INSERT INTO cliente (CLI_CEDULA, CLI_PRIMERAPELLIDO, CLI_SEGUNDOAPELLIDO, CLI_PRIMERNOMBRE, CLI_SEGUNDONOMBRE, CLI_EMAIL, CLI_CONTACTO, CLI_DIRECCION, CLI_FECNACIMIENTO, CLI_ESTADO)
VALUES ('1709029480', 'Gonzalez', 'Silva', 'Ana', 'Gabriela', 'ana.gonzalez@hotmail.com', '0998877665', 'Av. Las Rosas 234', '1995-08-20', 'Activo');


INSERT INTO cliente (CLI_CEDULA, CLI_PRIMERAPELLIDO,CLI_SEGUNDOAPELLIDO, CLI_PRIMERNOMBRE,CLI_SEGUNDONOMBRE,CLI_EMAIL, CLI_CONTACTO,CLI_DIRECCION,CLI_FECNACIMIENTO, CLI_ESTADO)
VALUES ('1709040925', 'Hernandez','Cadena', 'Luis','Pablo','luisherna@gmail.com', '0987654321','Av.Repblica','2000-01-01', 'Activo');

INSERT INTO cliente (CLI_CEDULA, CLI_PRIMERAPELLIDO, CLI_SEGUNDOAPELLIDO, CLI_PRIMERNOMBRE, CLI_SEGUNDONOMBRE, CLI_EMAIL, CLI_CONTACTO, CLI_DIRECCION, CLI_FECNACIMIENTO, CLI_ESTADO)
VALUES ('1714021753', 'Rios', 'Paredes', 'Carolina','Camila', 'caro.rios@hotmail.com', '0976543210','La Gasca','2000-08-02', 'Activo');


INSERT INTO cliente (CLI_CEDULA, CLI_PRIMERAPELLIDO, CLI_SEGUNDOAPELLIDO, CLI_PRIMERNOMBRE, CLI_SEGUNDONOMBRE, CLI_EMAIL, CLI_CONTACTO, CLI_DIRECCION, CLI_FECNACIMIENTO, CLI_ESTADO)
VALUES ('1713848446', 'Martinez', 'Moreno','Jose','Marco', 'jose.mtz@gmail.com', '0965432109', 'Calle Los Pinos 789', '1992-11-10', 'Activo');





INSERT INTO cliente (CLI_CEDULA, CLI_PRIMERAPELLIDO, CLI_SEGUNDOAPELLIDO, CLI_PRIMERNOMBRE, CLI_SEGUNDONOMBRE, CLI_EMAIL, CLI_CONTACTO, CLI_DIRECCION, CLI_FECNACIMIENTO, CLI_ESTADO)
VALUES ('0953846136', 'Ramirez','Alvarez', 'Andrés','Fernando','andfres_fer@gmail.com', '0991234567','Av. Patria','2002-04-02', 'Activo');


INSERT INTO cliente (CLI_CEDULA, CLI_PRIMERAPELLIDO, CLI_SEGUNDOAPELLIDO, CLI_PRIMERNOMBRE, CLI_SEGUNDONOMBRE, CLI_EMAIL, CLI_CONTACTO, CLI_DIRECCION, CLI_FECNACIMIENTO, CLI_ESTADO)
VALUES ('0704601079', 'Gómez','Fernandez','Julia','Maria','gomaria@hotmail.com', '0987654321','Av NNUU','1997-02-01', 'Activo');


INSERT INTO cliente (CLI_CEDULA, CLI_PRIMERAPELLIDO, CLI_SEGUNDOAPELLIDO, CLI_PRIMERNOMBRE, CLI_SEGUNDONOMBRE, CLI_EMAIL, CLI_CONTACTO, CLI_DIRECCION, CLI_FECNACIMIENTO, CLI_ESTADO)
VALUES ('0704892454', 'Vargas', 'Valenzuela', 'María', 'Eugenia', 'mevargas@gmail.com', '0965432109', 'Av. Los Pájaros 987', '1985-07-25', 'Activo');


INSERT INTO cliente (CLI_CEDULA, CLI_PRIMERAPELLIDO, CLI_SEGUNDOAPELLIDO, CLI_PRIMERNOMBRE, CLI_SEGUNDONOMBRE, CLI_EMAIL, CLI_CONTACTO, CLI_DIRECCION, CLI_FECNACIMIENTO, CLI_ESTADO)
VALUES ('0705127637', 'González','Garcia', 'Roberto','Marcel', 'roberto.g@gmail.com', '0976543210', 'Calle Las Flores 123', '1998-03-12', 'Activo');


INSERT INTO cliente (CLI_CEDULA, CLI_PRIMERAPELLIDO, CLI_SEGUNDOAPELLIDO, CLI_PRIMERNOMBRE, CLI_SEGUNDONOMBRE, CLI_EMAIL, CLI_CONTACTO, CLI_DIRECCION, CLI_FECNACIMIENTO, CLI_ESTADO)
VALUES ('0705533933', 'Sánchez', 'Hernández', 'Juan','Franco', 'juan.san@gmail.com', '0998765432','Av America', '2003-05-05','Activo');


INSERT INTO cliente (CLI_CEDULA, CLI_PRIMERAPELLIDO, CLI_SEGUNDOAPELLIDO, CLI_PRIMERNOMBRE, CLI_SEGUNDONOMBRE, CLI_EMAIL, CLI_CONTACTO, CLI_DIRECCION, CLI_FECNACIMIENTO, CLI_ESTADO)
VALUES ('0705972404', 'Torres','Cardenas', 'Javier','Pedro', 'javiertorres@gmail.com', '0987654321', 'Av. Principal 789', '1994-09-18', 'Activo');


INSERT INTO cliente (CLI_CEDULA, CLI_PRIMERAPELLIDO, CLI_SEGUNDOAPELLIDO, CLI_PRIMERNOMBRE, CLI_SEGUNDONOMBRE, CLI_EMAIL, CLI_CONTACTO, CLI_DIRECCION, CLI_FECNACIMIENTO, CLI_ESTADO)
VALUES ('0706333044', 'Mendoza', 'Paredes', 'María','Juana','maria.mendoza@gmail.com', '0998877665','Las Casas','1995-01-01', 'Activo');


INSERT INTO cliente (CLI_CEDULA, CLI_PRIMERAPELLIDO, CLI_SEGUNDOAPELLIDO, CLI_PRIMERNOMBRE, CLI_SEGUNDONOMBRE, CLI_EMAIL, CLI_CONTACTO, CLI_DIRECCION, CLI_FECNACIMIENTO, CLI_ESTADO)
VALUES ('0402113971', 'Rodríguez','Neira','Carlos','Daniel','cardani@gmail.com', '0976543210','Av Oriental','2000-01-03', 'Activo');


INSERT INTO cliente (CLI_CEDULA, CLI_PRIMERAPELLIDO, CLI_SEGUNDOAPELLIDO, CLI_PRIMERNOMBRE, CLI_SEGUNDONOMBRE, CLI_EMAIL, CLI_CONTACTO, CLI_DIRECCION, CLI_FECNACIMIENTO, CLI_ESTADO)
VALUES ('0501722607', 'Velasco', 'Salcedo', 'Ana', 'María', 'anavel@gmail.com', '0987654321', 'Calle Los Pinos 234', '1993-12-05', 'Activo');


INSERT INTO cliente (CLI_CEDULA, CLI_PRIMERAPELLIDO, CLI_SEGUNDOAPELLIDO, CLI_PRIMERNOMBRE, CLI_SEGUNDONOMBRE, CLI_EMAIL, CLI_CONTACTO, CLI_DIRECCION, CLI_FECNACIMIENTO, CLI_ESTADO)
VALUES ('1751304286', 'Paredes','Zambrano', 'Eduardo','Cristopher', 'edupar@gmail.com', '0976543210', 'Av. Las Rosas 567', '1997-06-30', 'Activo');


INSERT INTO cliente (CLI_CEDULA, CLI_PRIMERAPELLIDO, CLI_SEGUNDOAPELLIDO, CLI_PRIMERNOMBRE, CLI_SEGUNDONOMBRE, CLI_EMAIL, CLI_CONTACTO, CLI_DIRECCION, CLI_FECNACIMIENTO, CLI_ESTADO)
VALUES ('1751289180', 'Rivas', 'Arévalo', 'Javier','Lenin', 'javierrivas@gmail.com', '0998765432','Sangolqui','1987-04-02', 'Activo');

INSERT INTO cliente (CLI_CEDULA, CLI_PRIMERAPELLIDO, CLI_SEGUNDOAPELLIDO, CLI_PRIMERNOMBRE, CLI_SEGUNDONOMBRE, CLI_EMAIL, CLI_CONTACTO, CLI_DIRECCION, CLI_FECNACIMIENTO, CLI_ESTADO)
VALUES ('1751289834', 'Cháves','Almagro', 'Diego','Ellian','diegelli2@gmail.com', '0987654421','Carcelen alto','1995-03-04', 'Activo');

/*==============================================================*/
/* NUEVOS PROVEEDORES                                          */
/*==============================================================*/
INSERT INTO proovedor (PROV_RUC, PROV_NOMBRE, PROV_EMAIL, PROV_CONTACTO, PROV_DIRECCION, PROV_ESTADO)
VALUES ('1805521000001','Displast','displast@gmail.com','2542847','Quito','Activo');

INSERT INTO proovedor (PROV_RUC, PROV_NOMBRE, PROV_EMAIL, PROV_CONTACTO, PROV_DIRECCION, PROV_ESTADO)
VALUES ('1850418813001','Prolimec','prolimec@gmail.com','0958919170','Quito','Activo');

INSERT INTO proovedor (PROV_RUC, PROV_NOMBRE, PROV_EMAIL, PROV_CONTACTO, PROV_DIRECCION, PROV_ESTADO)
VALUES ('0202041513001','Disfasur','compras_bodega@disfasur.com.ec','043917504','Quito','Activo');

INSERT INTO proovedor (PROV_RUC, PROV_NOMBRE, PROV_EMAIL, PROV_CONTACTO, PROV_DIRECCION, PROV_ESTADO)
VALUES ('0201813524001','Enkador S.A','enkadorsa@gmail.com','2847684','Quito','Activo');

/*==============================================================*/
/* NUEVAS CATEGORIAS                                            */
/*==============================================================*/
INSERT INTO categoria (CAT_NOMBRE,CAT_DESCRIPCION) VALUES ('Enlatado','Productos que se venden enlatados');
INSERT INTO categoria (CAT_NOMBRE,CAT_DESCRIPCION) VALUES ('Desechable','Productos de un solo uso,servilletas,vasos de plastico,etc..');
INSERT INTO categoria (CAT_NOMBRE,CAT_DESCRIPCION) VALUES ('Limpieza','Productos de limpieza como jabon de baño,jabon de plato,etc..');
INSERT INTO categoria (CAT_NOMBRE,CAT_DESCRIPCION) VALUES ('Medicamento','Productos para la salud');
INSERT INTO categoria (CAT_NOMBRE,CAT_DESCRIPCION) VALUES ('Accesorio','Estos productos son considerados suministros que las personas pueden comprar para diversas actividades');
INSERT INTO categoria (CAT_NOMBRE,CAT_DESCRIPCION) VALUES ('Procesado','Alimentos procesados');

/*==============================================================*/
/* NUEVOS PRODUCTOS                                            */
/*==============================================================*/

INSERT INTO producto (PROV_ID, CAT_ID, PRO_NOMBRE, PRO_DESCRIPCION, PRO_STOCK, PRO_PRECIO, PRO_IVA, PRO_ESTADO)
VALUES (4, 2, 'Atún Real pequeño', 'Atun marca royal pequeño con aceite de girasol', 30, 1.00, 'No Aplica', 'Activo');

INSERT INTO producto (PROV_ID, CAT_ID, PRO_NOMBRE, PRO_DESCRIPCION, PRO_STOCK, PRO_PRECIO, PRO_IVA, PRO_ESTADO)
VALUES (4, 2, 'Atún Real grande', 'Atun marca royal grande con aceite de girasol', 20, 1.70, 'No Aplica', 'Activo');

INSERT INTO producto (PROV_ID, CAT_ID, PRO_NOMBRE, PRO_DESCRIPCION, PRO_STOCK, PRO_PRECIO, PRO_IVA, PRO_ESTADO)
VALUES (8, 14, 'Vaso de plastico', 'vaso pequeño de plastico desechable', 100, 0.10, 'No Aplica', 'Activo');

INSERT INTO producto (PROV_ID, CAT_ID, PRO_NOMBRE, PRO_DESCRIPCION, PRO_STOCK, PRO_PRECIO, PRO_IVA, PRO_ESTADO)
VALUES (8, 14, 'Cuchara de plastico', 'cuchara pequeña de plastico', 100, 0.05, 'No Aplica', 'Activo');

INSERT INTO producto (PROV_ID, CAT_ID, PRO_NOMBRE, PRO_DESCRIPCION, PRO_STOCK, PRO_PRECIO, PRO_IVA, PRO_ESTADO)
VALUES (8, 14, 'Plato de plastico', 'plato pequeño de plastico desechable', 100, 0.10, 'No Aplica', 'Activo');

INSERT INTO producto (PROV_ID, CAT_ID, PRO_NOMBRE, PRO_DESCRIPCION, PRO_STOCK, PRO_PRECIO, PRO_IVA, PRO_ESTADO)
VALUES (8, 14, 'Paquete de vasos plasticos', 'paquete de 20 unidades de vasos de plastico', 20, 2.00, 'No Aplica', 'Activo');

INSERT INTO producto (PROV_ID, CAT_ID, PRO_NOMBRE, PRO_DESCRIPCION, PRO_STOCK, PRO_PRECIO, PRO_IVA, PRO_ESTADO)
VALUES (8, 14, 'Paquete de fundas de basura', 'funas de plastico negras para la basura', 15, 1.50, 'No Aplica', 'Activo');

INSERT INTO producto (PROV_ID, CAT_ID, PRO_NOMBRE, PRO_DESCRIPCION, PRO_STOCK, PRO_PRECIO, PRO_IVA, PRO_ESTADO)
VALUES (9, 15, 'Esponja', 'Esponja para lavar platos', 15, 0.50, 'No Aplica', 'Activo');

INSERT INTO producto (PROV_ID, CAT_ID, PRO_NOMBRE, PRO_DESCRIPCION, PRO_STOCK, PRO_PRECIO, PRO_IVA, PRO_ESTADO)
VALUES (9, 15, 'Papel higienico Scott', 'Unidad de papel higienico marca scott', 30, 0.75, 'No Aplica', 'Activo');

INSERT INTO producto (PROV_ID, CAT_ID, PRO_NOMBRE, PRO_DESCRIPCION, PRO_STOCK, PRO_PRECIO, PRO_IVA, PRO_ESTADO)
VALUES (9, 15, 'Paquete Scott x4', 'Paquete de papel higenico scott 4 unidades', 30, 2.00, 'No Aplica', 'Activo');

INSERT INTO producto (PROV_ID, CAT_ID, PRO_NOMBRE, PRO_DESCRIPCION, PRO_STOCK, PRO_PRECIO, PRO_IVA, PRO_ESTADO)
VALUES (9, 15, 'Cloro', 'Cloro liquido para limpieza', 10, 1.00, 'No Aplica', 'Activo');

INSERT INTO producto (PROV_ID, CAT_ID, PRO_NOMBRE, PRO_DESCRIPCION, PRO_STOCK, PRO_PRECIO, PRO_IVA, PRO_ESTADO)
VALUES (9, 15, 'Deja', 'Detergente para limpiar ropa', 10, 1.20, 'No Aplica', 'Activo');

INSERT INTO producto (PROV_ID, CAT_ID, PRO_NOMBRE, PRO_DESCRIPCION, PRO_STOCK, PRO_PRECIO, PRO_IVA, PRO_ESTADO)
VALUES (10, 16, 'Aspirina', 'Pastilla para el dolor de cabeza', 10, 0.50, 'No Aplica', 'Activo');

INSERT INTO producto (PROV_ID, CAT_ID, PRO_NOMBRE, PRO_DESCRIPCION, PRO_STOCK, PRO_PRECIO, PRO_IVA, PRO_ESTADO)
VALUES (11, 17, 'Aguja', 'Aguja para cocer', 100, 0.05, 'No Aplica', 'Activo');

INSERT INTO producto (PROV_ID, CAT_ID, PRO_NOMBRE, PRO_DESCRIPCION, PRO_STOCK, PRO_PRECIO, PRO_IVA, PRO_ESTADO)
VALUES (2, 18, 'Gelatina Royal frambuesa ', 'gelatina sabor a frambuesa de 40gramos', 20, 1.70, 'No Aplica', 'Activo');

INSERT INTO producto (PROV_ID, CAT_ID, PRO_NOMBRE, PRO_DESCRIPCION, PRO_STOCK, PRO_PRECIO, PRO_IVA, PRO_ESTADO)
VALUES (4, 7, 'Gaseosa Pepsi', 'pepsi personal 355ML', 20, 0.40, 'No Aplica', 'Activo');

INSERT INTO producto (PROV_ID, CAT_ID, PRO_NOMBRE, PRO_DESCRIPCION, PRO_STOCK, PRO_PRECIO, PRO_IVA, PRO_ESTADO)
VALUES (3, 7, 'Vita Leche', 'leche vita descremeda 200ml', 20, 1.03, 'No Aplica', 'Activo');
