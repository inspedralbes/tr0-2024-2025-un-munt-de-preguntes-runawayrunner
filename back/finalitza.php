<?php
session_start();

$dadesUsuari = file_get_contents('php://input');
$respostesUsuari = json_decode($dadesUsuari, true);
$preguntesSeleccionades = $_SESSION['preguntesSeleccionades'];

$resultados = [];

foreach ($respostesUsuari as $respostaUsuari) {
    foreach ($preguntesSeleccionades as $pregunta) {
        if ($pregunta['id'] == $respostaUsuari['pregunta']) {
            $indexRespostaCorrecte = array_search(true, array_column($pregunta['respostes'], 'correcta'));
            
            if ($respostaUsuari['resposta'] == $indexRespostaCorrecte) {
                $resultados[] = [
                    'pregunta' => $pregunta['id'],
                    'resposta' => '&#10003',
                    'correcta' => true
                ];
            } else {
                $resultados[] = [
                    'pregunta' => $pregunta['id'],
                    'resposta' => 'incorrecte',
                    'correcta' => false
                ];
            }
            break;
        }
    }
}

echo json_encode($resultados);
?>