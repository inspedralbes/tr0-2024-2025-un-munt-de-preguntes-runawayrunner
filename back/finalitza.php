<?php

$correctas = 0;

$import = file_get_contents("php://input");
$respostesUsuari = json_decode($import, true);

$preguntasSeleccionades = $_SESSION['preguntesSeleccionades'];
sort($preguntasSeleccionades);

$totalPreguntes = count($preguntasSeleccionades);

for ($index = 0; $index < $totalPreguntes; $index++) { 
    $pregunta = $preguntasSeleccionades[$index];
    $resposta = $preguntasSeleccionades[$index];

    $indexRespostaCorrecte = array_search(true, array_column($pregunta['respostes'], 'correcta'));

    if ($resposta == $indexRespostaCorrecte) {
        $correctas++;
    }
}

echo json_encode($correctas);
?>