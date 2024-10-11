<?php
session_start();
include("connexio.php");

$nPreguntes = $_GET['nPreguntes'];

$sql = "SELECT * FROM preguntes ORDER BY RAND() LIMIT $nPreguntes";
$result = $conn->query($sql);

$preguntesSeleccionades = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $pregunta_id = $row['id'];
        $pregunta_texto = $row['pregunta'];
        $imatge = $row['imatge'];

        $sql_respostes = "SELECT id, resposta FROM respostes WHERE pregunta_id = $pregunta_id";
        $result_respostes = $conn->query($sql_respostes);

        $respostes = [];
        if ($result_respostes->num_rows > 0) {
            while ($resposta_row = $result_respostes->fetch_assoc()) {
                $respostes[] = [
                    'id' => $resposta_row['id'],
                    'resposta' => $resposta_row['resposta']
                ];
            }
        }

        $preguntesSeleccionades[] = [
            'id' => $pregunta_id,
            'pregunta' => $pregunta_texto,
            'imatge' => $imatge,
            'respostes' => $respostes
        ];
    }
}

$sqlPreguntesOriginals = "SELECT * FROM preguntes";
$resultPreguntes = $conn->query($sqlPreguntesOriginals);

// Guardar todes les preguntes originals
$preguntes = [];

if ($resultPreguntes->num_rows > 0) {
    while ($row = $resultPreguntes->fetch_assoc()) {
        $pregunta_id = $row['id'];
        $pregunta_texto = $row['pregunta'];
        $imatge = $row['imatge'];

        $sql_respostes = "SELECT id, resposta, correcta FROM respostes WHERE pregunta_id = $pregunta_id";
        $resultPreguntes_respostes = $conn->query($sql_respostes);

        $respostes = [];
        if ($resultPreguntes_respostes->num_rows > 0) {
            while ($resposta_row = $resultPreguntes_respostes->fetch_assoc()) {
                $respostes[] = [
                    'id' => $resposta_row['id'],
                    'resposta' => $resposta_row['resposta'],
                    'correcta' => $resposta_row['correcta'],
                ];
            }
        }

        $preguntes [] = [
            'id' => $pregunta_id,
            'pregunta' => $pregunta_texto,
            'imatge' => $imatge,
            'respostes' => $respostes
        ];
    }
}

$_SESSION['preguntesOriginals'] = $preguntes;

header('Content-Type: application/json');
echo json_encode($preguntesSeleccionades);
?>