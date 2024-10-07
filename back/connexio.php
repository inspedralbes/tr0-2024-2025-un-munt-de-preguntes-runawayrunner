<?php
/*
    $host = "localhost";
    $usuario = "root";
    $password = "";
    $nombreBD = "autoEscola";
*/
    $host = "localhost:3306";
    $usuario = "a21aivantjeh_aivan";
    $password = "i|/8tA!+kC&mQTFk";
    $nombreBD = "a21aivantjeh_autoescola";

    $conn = new mysqli ($host, $usuario, $password, $nombreBD);

    if ($conn->connect_error) {
        die("Connection error: " . $conn->connect_error);
    }
?>