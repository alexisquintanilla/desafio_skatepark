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