<?php
    $host = "localhost";
    $usuario = "root";
    $password = "";
    $nombreBD = "autoEscola";

    $conn = new mysqli ($host, $usuario, $password, $nombreBD);

    if ($conn->connect_error) {
        die("Connection error: " . $conn->connect_error);
    }
?>