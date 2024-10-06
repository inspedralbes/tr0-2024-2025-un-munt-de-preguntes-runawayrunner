<?php
    require 'connexio.php';

    $sql = "CREATE DATABASE IF NOT EXISTS $nombreBD";

    if ($conn->query($sql)) {
        echo "Base de datos creado.<br>";
    } else {
        echo "Error en crear la base de datos: " . $conn->error;
    }

    $conn->select_db($nombreBD);

    // Tabla preguntes
    $tablaPreguntes = "CREATE TABLE IF NOT EXISTS preguntes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        pregunta VARCHAR(255) NOT NULL,
        imatge VARCHAR(255)
    )";

    if ($conn->query($tablaPreguntes)) {
        echo "Tabla 'preguntes' creada.<br>";
    } else {
        echo "Error creando la tabla: " . $conn->error;
    }

    // Tabla respostes
    $tablaRespostes = "CREATE TABLE IF NOT EXISTS respostes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        pregunta_id INT,
        resposta VARCHAR(255) NOT NULL,
        correcta BOOLEAN NOT NULL,
        FOREIGN KEY (pregunta_id) REFERENCES preguntes(id)
    )";

    if ($conn->query($tablaRespostes) === TRUE) {
        echo "Tabla 'respostes' creada<br>";
    } else {
        echo "Error creando la tabla: " . $conn->error;
    }

    $json_data = file_get_contents("preguntes.json");
    $preguntesArray = json_decode($json_data, true);

    foreach ($preguntesArray['preguntes'] as $pregunta) {
        $pregunta_text = $pregunta['pregunta'];
        $imatge = $pregunta['imatge'];

        $stmt = $conn->prepare("INSERT INTO preguntes (pregunta, imatge) VALUES (?, ?)");
        $stmt->bind_param("ss", $pregunta_text, $imatge);

        if ($stmt->execute()) {
            $pregunta_id = $stmt->insert_id;
            echo "Pregunta insertada con ID: " . $pregunta_id . "<br>";

            foreach ($pregunta['respostes'] as $resposta) {
                $resposta_text = $resposta['resposta'];
                $correcta = $resposta['correcta'];

                $stmt_resposta = $conn->prepare("INSERT INTO respostes (pregunta_id, resposta, correcta) VALUES (?, ?, ?)");
                $stmt_resposta->bind_param("isi", $pregunta_id, $resposta_text, $correcta);

                if ($stmt_resposta->execute()) {
                    echo "Resposta insertada para la pregunta con ID: " . $pregunta_id . "<br>";
                } else {
                    echo "Error insertando la resposta: " . $stmt_resposta->error . "<br>";
                }
            }
        } else {
            echo "Error insertando la pregunta: " . $stmt->error . "<br>";
        }
    }

    echo "Dades insertades correctament.";
    $stmt->close();
    $conn->close();
?>