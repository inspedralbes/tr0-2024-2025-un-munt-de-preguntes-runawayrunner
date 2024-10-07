<?php
session_start();

$dadesUsuari = file_get_contents('php://input');
$respostesUsuari = json_decode($dadesUsuari, true);
$preguntesOriginals = $_SESSION['preguntesOriginals'];

$resultados = [];

foreach ($respostesUsuari as $respostaUsuari) {
    foreach ($preguntesOriginals as $pregunta) {
        if ($pregunta['id'] == $respostaUsuari['pregunta']) {
            $indexRespostaCorrecte = array_search(true, array_column($pregunta['respostes'], 'correcta'));
            $respostaUsuariText = $pregunta['respostes'][$respostaUsuari['resposta']]['resposta'];
            if ($respostaUsuari['resposta'] == $indexRespostaCorrecte) {
                $resultados[] = [
                    'pregunta' => $pregunta['id'],
                    'resposta' => $respostaUsuariText,
                    'correcta' => true
                ];
            } else {
                $resultados[] = [
                    'pregunta' => $pregunta['id'],
                    'resposta' => $respostaUsuariText,
                    'correcta' => false
                ];
            }
            break;
        }
    }
}
session_destroy();
echo json_encode($resultados);
?>