# Proyecto : Skate Park

Aplicación web completa y dinámica que
funciona como para registrar usuarios o competidores.

## Descripción del proyecto

El proyecto consta una entrada con el listado de todos los participantes, con opciones para ingresar y modificar datos o registrarse.

Dentro de la app una vez ingresado existen dos roles Administrador y Usuarios.

- Administrador :
Puede habilitar o no a los usuarios le cambia el estado.

- Usuario : Puede actualizar sus datos excepto el email y la foto


## Dependencias


- Sistema Operativo (Ubuntu 20.04, Windows 10, windows 11)
- Front en HTML, CSS , JavaScript 
- Backend en Node.js , express, JsonWebToken, handlebars, dotenv
- Base de datos (PostgreSQL 16)


## Instalación del Proyecto

Posicionar en directorio raiz e instalar dependencias

```bash
npm i
```
Remplazar los datos de user y pass de tu DB en el archivo .env

```bash
DATABASE_URL
```


## Instrucciones para Ejecutar el Proyecto

Instrucciones para ejecutar el proyecto una vez instalado.

```bash
npm start index.js
```

## Instrucciones para Cargar los Datos Semilla a la Base de Datos


```bash
DROP TABLE IF EXISTS SKATERS;

CREATE TABLE skaters (
	id SERIAL,
	email VARCHAR(50) NOT NULL,
	nombre VARCHAR(25) NOT NULL,
	password VARCHAR(100) NOT NULL,
	anos_experiencia INT NOT NULL,
	especialidad VARCHAR(50) NOT NULL,
	foto VARCHAR(255) NOT NULL,
	estado BOOLEAN NOT NULL,
	role_id INT NOT NULL
);

INSERT INTO skaters (email, nombre, password, anos_experiencia, especialidad, foto, estado,role_id) VALUES
('admin@admin.com', 'admin', '123456', 5, 'Saltos', '/assets/img/alexis.jpg', TRUE,1);

select * from skaters;
```


## Credenciales de Acceso

### Para Usuario Tipo Administrador

- Email: admin@admin.com
- Contraseña: 123456

## Autor

Alexis Quintanilla López  🤖

---