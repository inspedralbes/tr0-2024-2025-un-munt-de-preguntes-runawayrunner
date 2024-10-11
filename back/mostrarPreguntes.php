<?php

include ("connexio.php");

$sql =  "SELECT * FROM preguntes";
$resultPreguntes = $conn->query($sql);

$preguntes = [];

if ( $resultPreguntes->num_rows > 0) {
    while ($row = $resultPreguntes->fetch_assoc()) {
        $pregunta_id = $row['id'];
        $pregunta_texto = $row['pregunta'];
        $imatge = $row['imatge'];

        $sql_respostes = "SELECT id, resposta, correcta FROM respostes WHERE pregunta_id = '$pregunta_id'";
        $result_respostes = $conn->query($sql_respostes);

        $respostes = [];

        if ($result_respostes->num_rows > 0) {
            while ($resposta_row = $result_respostes->fetch_assoc()) {
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
header('Content-Type: applicaction/json');
echo json_encode($preguntes);
?>