<?php
    $host = "localhost";
    $usuario = "root";
    $password = "";
    $nombreBD = "autoEscola";

    $conn = new mysqli ($host, $usuario, $password);

    if ($conn->connect_error) {
        die("Connection error: " . $conn->connect_error);
    }

    // Tabla preguntes
    $crearTabla = "CREATE TABLE IF NOT EXISTS preguntes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        pregunta VARCHAR(255) NOT NULL,
        imatge VARCHAR(255)
    )";

    if ($conn->query($crearTabla)) {
        echo "Tabla 'preguntes' creada.<br>";
    } else {
        echo "Error creando la tabla: " . $conn->error;
    }

    // Tabla respostes
    $crearTablaRespostes = "CREATE TABLE IF NOT EXISTS respostes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        pregunta_id INT,
        resposta VARCHAR(255) NOT NULL,
        correcta BOOLEAN NOT NULL,
        FOREIGN KEY (pregunta_id) REFERENCES preguntes(id)
    )";

    if ($conn->query($crearTablaRespostes) === TRUE) {
        echo "Tabla 'respostes' creada<br>";
    } else {
        echo "Error creando la tabla: " . $conn->error;
    }

?>