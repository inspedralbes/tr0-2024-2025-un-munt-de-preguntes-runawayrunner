<?php
    require 'connexio.php';

    $sql = "CREATE DATABASE IF NOT EXISTS $nombreBD";

    if ($conn->query($sql)) {
        echo "Base de datos creado.<br>";
    } else {
        echo "Error en crear la base de datos: " . $conn->error;
    }

    $conn->select_db($nombreBD);

    if ($conn->query($crearTabla) === TRUE) {
        echo "Tabla 'preguntes' creada.<br>";
    } else {
        echo "Error creando la tabla: " . $conn->error;
    }
?>