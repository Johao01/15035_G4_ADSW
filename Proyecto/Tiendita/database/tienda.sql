/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     27/7/2023 21:21:39                           */
/*==============================================================*/
/*ALTER USER 'root'@'localhost' IDENTIFIED BY 'root';*/
drop database tienda;
create database tienda;
use tienda;

drop table if exists CATEGORIA;

drop table if exists CLIENTE;

drop table if exists DETALLE;

drop table if exists FACTURA;

drop table if exists INVENTARIO;

drop table if exists PRODUCTO;

drop table if exists PROOVEDOR;

/*==============================================================*/
/* Table: CATEGORIA                                             */
/*==============================================================*/
create table CATEGORIA
(
   CAT_ID               int auto_increment not null,
   CAT_NOMBRE           varchar(50) not null,
   CAT_DESCRIPCION      varchar(250),
   primary key (CAT_ID)
);

/*==============================================================*/
/* Table: CLIENTE                                               */
/*==============================================================*/
create table CLIENTE
(
   CLI_ID               int auto_increment not null,
   CLI_CEDULA           varchar(10) not null,
   CLI_PRIMERAPELLIDO   varchar(30) not null,
   CLI_SEGUNDOAPELLIDO  varchar(30),
   CLI_PRIMERNOMBRE     varchar(30) not null,
   CLI_SEGUNDONOMBRE    varchar(30),
   CLI_EMAIL            varchar(75),
   CLI_CONTACTO         varchar(10),
   CLI_DIRECCION        varchar(100),
   CLI_FECNACIMIENTO    date,
   CLI_ESTADO           varchar(10) not null,
   primary key (CLI_ID)
);

/*==============================================================*/
/* Table: DETALLE                                               */
/*==============================================================*/
create table DETALLE
(
   DET_ID               int auto_increment not null,
   FAC_ID               int not null,
   PRO_ID               int not null,
   DET_CANTIDAD         int not null CHECK (DET_CANTIDAD >= 0),
   DET_PRECIOTOTAL      float(6,2),
   primary key (DET_ID)
);

/*==============================================================*/
/* Table: FACTURA                                               */
/*==============================================================*/
create table FACTURA
(
   FAC_ID               int auto_increment not null,
   CLI_ID               int not null,
   FAC_IVA              float(6,2),
   FAC_SUBTOTAL         float(6,2),
   FAC_TOTAL            float(6,2),
   FAC_METODOPAGO       char(3),
   FAC_FECHA            date,
   primary key (FAC_ID)
);

/*==============================================================*/
/* Table: INVENTARIO                                            */
/*==============================================================*/
create table INVENTARIO
(
   INV_ID               int auto_increment not null,
   PRO_ID               int not null,
   INV_CANTIDAD         int not null,
   INV_FECHA            date not null,
   primary key (INV_ID)
);

/*==============================================================*/
/* Table: PRODUCTO                                              */
/*==============================================================*/
create table PRODUCTO
(
   PRO_ID               int auto_increment not null,
   PROV_ID              int not null,
   CAT_ID               int not null,
   PRO_NOMBRE           varchar(100) not null,
   PRO_DESCRIPCION      varchar(250),
   PRO_STOCK            int not null CHECK (PRO_STOCK >= 0),
   PRO_PRECIO           float(8,2) not null CHECK (PRO_PRECIO >= 0),
   PRO_IVA              varchar(10) not null,
   PRO_ESTADO           varchar(10) not null,
   primary key (PRO_ID)
);

/*==============================================================*/
/* Table: PROOVEDOR                                             */
/*==============================================================*/
create table PROOVEDOR
(
   PROV_ID              int auto_increment not null,
   PROV_RUC             varchar(13) not null,
   PROV_NOMBRE          varchar(40) not null,
   PROV_EMAIL           varchar(75) not null,
   PROV_CONTACTO        varchar(10),
   PROV_DIRECCION       varchar(150),
   PROV_ESTADO          varchar(10) not null,
   primary key (PROV_ID)
);

alter table DETALLE add constraint FK_DA foreign key (PRO_ID)
      references PRODUCTO (PRO_ID) on delete restrict on update restrict;

alter table DETALLE add constraint FK_ORIGINA foreign key (FAC_ID)
      references FACTURA (FAC_ID) on delete restrict on update restrict;

alter table FACTURA add constraint FK_GENERA foreign key (CLI_ID)
      references CLIENTE (CLI_ID) on delete restrict on update restrict;

alter table INVENTARIO add constraint FK_CORRESPONDE foreign key (PRO_ID)
      references PRODUCTO (PRO_ID) on delete restrict on update restrict;

alter table PRODUCTO add constraint FK_PROVEE foreign key (PROV_ID)
      references PROOVEDOR (PROV_ID) on delete restrict on update restrict;

alter table PRODUCTO add constraint FK_RELATIONSHIP_1 foreign key (CAT_ID)
      references CATEGORIA (CAT_ID) on delete restrict on update restrict;



/*TRIGGER PARA ACTUALIZAR EL STOCK CUANDO SE INGRESA UN DATO EN EL INVENTARIO*/
DELIMITER //
CREATE TRIGGER actualizar_stock AFTER INSERT ON INVENTARIO
FOR EACH ROW
BEGIN
    DECLARE producto_id INT;
    DECLARE cantidad_nueva INT;

    SET producto_id = NEW.PRO_ID;
    SET cantidad_nueva = NEW.INV_CANTIDAD;

    UPDATE PRODUCTO
    SET PRO_STOCK = PRO_STOCK + cantidad_nueva
    WHERE PRO_ID = producto_id;
END;
//
DELIMITER ;


/*TRIGGER DE LA TABLA DETALLE*/
/*TRIGGER CALCULA EL PRECIO TOTAL CUANDO SE INGRESA UN PRODUCTO AL DETALLE*/
DELIMITER //
CREATE TRIGGER calcular_precio_total BEFORE INSERT ON DETALLE
FOR EACH ROW
BEGIN
    DECLARE precio_unitario FLOAT(8,2);

    SELECT PRO_PRECIO INTO precio_unitario
    FROM PRODUCTO
    WHERE PRO_ID = NEW.PRO_ID;

    SET NEW.DET_PRECIOTOTAL = NEW.DET_CANTIDAD * precio_unitario;
END;
//
DELIMITER ;


/*TRIGGER CALCULA EL PRECIO TOTAL CUANDO SE ACTUALIZA EL DETALLE*/
DELIMITER //
CREATE TRIGGER update_precio_total BEFORE UPDATE ON DETALLE
FOR EACH ROW
BEGIN
    DECLARE precio_unitario FLOAT(8,2);

    SELECT PRO_PRECIO INTO precio_unitario
    FROM PRODUCTO
    WHERE PRO_ID = NEW.PRO_ID;

    SET NEW.DET_PRECIOTOTAL = NEW.DET_CANTIDAD * precio_unitario;
END;
//
DELIMITER ;

/*TRIGGER RESTA EL STOCK DEL PRODUCTO CUANDO SE INGRESA UN PRODUCTO AL DETALLE*/

DELIMITER //
CREATE TRIGGER restar_stock AFTER INSERT ON DETALLE
FOR EACH ROW
BEGIN
    DECLARE producto_id INT;
    DECLARE cantidad_nueva INT;

    SET producto_id = NEW.PRO_ID;
    SET cantidad_nueva = NEW.DET_CANTIDAD;

    UPDATE PRODUCTO
    SET PRO_STOCK = PRO_STOCK - cantidad_nueva
    WHERE PRO_ID = producto_id;
END;
//
DELIMITER ;



/*Actualiza el stock cuando se actuliza algo en el detalle*/
DELIMITER //
CREATE TRIGGER act_stock AFTER UPDATE ON DETALLE
FOR EACH ROW
BEGIN
    DECLARE producto_id INT;
    DECLARE cantidad_anterior INT;
    DECLARE cantidad_nueva INT;

    SET producto_id = NEW.PRO_ID;
    SET cantidad_anterior = OLD.DET_CANTIDAD;
    SET cantidad_nueva = NEW.DET_CANTIDAD;

    UPDATE PRODUCTO
    SET PRO_STOCK = PRO_STOCK + cantidad_anterior - cantidad_nueva
    WHERE PRO_ID = producto_id;
END;
//
DELIMITER ;


/*Actualiza el stock cuando se elimina un detalle antes de realizar la factura detalle*/
DELIMITER //
CREATE TRIGGER devolver_stock AFTER DELETE ON DETALLE
FOR EACH ROW
BEGIN
    DECLARE producto_id INT;
    DECLARE cantidad_borrada INT;

    SET producto_id = OLD.PRO_ID;
    SET cantidad_borrada = OLD.DET_CANTIDAD;

    UPDATE PRODUCTO
    SET PRO_STOCK = PRO_STOCK + cantidad_borrada
    WHERE PRO_ID = producto_id;
END;
//
DELIMITER ;

---------------------------------------------------------------
DELIMITER //

CREATE TRIGGER TOTAL
AFTER INSERT ON DETALLE
FOR EACH ROW
BEGIN
    -- Update the corresponding field in the FACTURA table
    UPDATE FACTURA
    SET FAC_TOTAL = FAC_TOTAL + NEW.DET_PRECIOTOTAL
    WHERE FAC_ID = NEW.FAC_ID;
END;
//

DELIMITER ;


DELIMITER //

CREATE TRIGGER ACTUALIZAR_TOTAL_AFTER_DELETE
AFTER DELETE ON DETALLE
FOR EACH ROW
BEGIN
    -- Update the corresponding field in the FACTURA table
    UPDATE FACTURA
    SET FAC_TOTAL = FAC_TOTAL - OLD.DET_PRECIOTOTAL
    WHERE FAC_ID = OLD.FAC_ID;
END;
//

DELIMITER ;


/*-----------------------------------------------------------------------------*/
DELIMITER //

CREATE TRIGGER TOTALUPDATE
AFTER UPDATE ON DETALLE
FOR EACH ROW
BEGIN
    -- Update the corresponding field in the FACTURA table
    UPDATE FACTURA
    SET FAC_TOTAL = FAC_TOTAL - OLD.DET_PRECIOTOTAL + NEW.DET_PRECIOTOTAL
    WHERE FAC_ID = NEW.FAC_ID;
END;
//

DELIMITER ;

/*----------------------------------------------------------------------------*/


DELIMITER //

CREATE TRIGGER SUBTOTAL
AFTER INSERT ON DETALLE
FOR EACH ROW
BEGIN
DECLARE iva_nuevo VARCHAR(10);
SELECT PRO_IVA INTO iva_nuevo
    FROM PRODUCTO
    WHERE PRO_ID = NEW.PRO_ID;

IF iva_nuevo = 'Aplica' THEN
    -- Update the corresponding field in the FACTURA table
    UPDATE FACTURA
    SET FAC_SUBTOTAL = FAC_SUBTOTAL + (NEW.DET_PRECIOTOTAL*0.88)
    WHERE FAC_ID = NEW.FAC_ID;
ELSE
UPDATE FACTURA
    SET FAC_SUBTOTAL = FAC_SUBTOTAL + (NEW.DET_PRECIOTOTAL)
    WHERE FAC_ID = NEW.FAC_ID;
END IF;

END;
//

DELIMITER ;



/*------------------------------------------------------------------------------*/




DELIMITER //

CREATE TRIGGER SUBTOTAL_UPDATE
AFTER UPDATE ON DETALLE
FOR EACH ROW
BEGIN
    DECLARE iva_nuevo VARCHAR(10);
    SELECT PRO_IVA INTO iva_nuevo
        FROM PRODUCTO
        WHERE PRO_ID = NEW.PRO_ID;

    IF iva_nuevo = 'Aplica' THEN
        -- Update the corresponding field in the FACTURA table
        UPDATE FACTURA
        SET FAC_SUBTOTAL = FAC_SUBTOTAL - OLD.DET_PRECIOTOTAL + (NEW.DET_PRECIOTOTAL*0.88)
        WHERE FAC_ID = NEW.FAC_ID;
    ELSE
        UPDATE FACTURA
        SET FAC_SUBTOTAL = FAC_SUBTOTAL - OLD.DET_PRECIOTOTAL + NEW.DET_PRECIOTOTAL
        WHERE FAC_ID = NEW.FAC_ID;
    END IF;

END;
//

DELIMITER ;



DELIMITER //

CREATE TRIGGER SUBTOTAL_AFTER_DELETE
AFTER DELETE ON DETALLE
FOR EACH ROW
BEGIN
    DECLARE iva_actual VARCHAR(10);
    SELECT PRO_IVA INTO iva_actual
    FROM PRODUCTO
    WHERE PRO_ID = OLD.PRO_ID;

    IF iva_actual = 'Aplica' THEN
        -- Update the corresponding field in the FACTURA table
        UPDATE FACTURA
        SET FAC_SUBTOTAL = FAC_SUBTOTAL - (OLD.DET_PRECIOTOTAL * 0.88)
        WHERE FAC_ID = OLD.FAC_ID;
    ELSE
        UPDATE FACTURA
        SET FAC_SUBTOTAL = FAC_SUBTOTAL - OLD.DET_PRECIOTOTAL
        WHERE FAC_ID = OLD.FAC_ID;
    END IF;
END;
//

DELIMITER ;



/*-----------------------------------------------------*/


DELIMITER //

CREATE TRIGGER IVA
AFTER INSERT ON DETALLE
FOR EACH ROW
BEGIN
DECLARE iva_nuevo VARCHAR(10);
SELECT PRO_IVA INTO iva_nuevo
    FROM PRODUCTO
    WHERE PRO_ID = NEW.PRO_ID;

IF iva_nuevo = 'Aplica' THEN
    -- Update the corresponding field in the FACTURA table
    UPDATE FACTURA
    SET FAC_IVA = FAC_IVA + (NEW.DET_PRECIOTOTAL*0.12)
    WHERE FAC_ID = NEW.FAC_ID;

END IF;

END;
//

DELIMITER ;
/*--------------------------------------------------------*/
DELIMITER //

CREATE TRIGGER IVA_UPDATE
AFTER UPDATE ON DETALLE
FOR EACH ROW
BEGIN
    DECLARE iva_nuevo VARCHAR(10);
    SELECT PRO_IVA INTO iva_nuevo
        FROM PRODUCTO
        WHERE PRO_ID = NEW.PRO_ID;

    IF iva_nuevo = 'Aplica' THEN
        -- Update the corresponding field in the FACTURA table
        UPDATE FACTURA
        SET FAC_IVA = FAC_IVA - (OLD.DET_PRECIOTOTAL * 0.12) + (NEW.DET_PRECIOTOTAL * 0.12)
        WHERE FAC_ID = NEW.FAC_ID;
    END IF;

END;
//

DELIMITER ;
DELIMITER //

CREATE TRIGGER IVA_AFTER_DELETE
AFTER DELETE ON DETALLE
FOR EACH ROW
BEGIN
    DECLARE iva_actual VARCHAR(10);
    SELECT PRO_IVA INTO iva_actual
    FROM PRODUCTO
    WHERE PRO_ID = OLD.PRO_ID;

    IF iva_actual = 'Aplica' THEN
        -- Update the corresponding field in the FACTURA table
        UPDATE FACTURA
        SET FAC_IVA = FAC_IVA - (OLD.DET_PRECIOTOTAL * 0.12)
        WHERE FAC_ID = OLD.FAC_ID;
    END IF;
END;
//

DELIMITER ;
