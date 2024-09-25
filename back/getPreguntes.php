<?php
session_start();
$jsonFile = file_get_contents('preguntes.json');
$datos = json_decode($jsonFile, true);
$preguntes = $datos["preguntes"];

shuffle($preguntes);

if (!isset($_SESSION['preguntesSeleccionades'])) {
    $preguntesSeleccionades = [];

    while (count($preguntesSeleccionades) < 10) {
        $posAleatoria = rand(0, count($preguntes) - 1);
        if (!in_array($preguntes[$posAleatoria], $preguntesSeleccionades)) {
            $preguntesSeleccionades[] = $preguntes[$posAleatoria];
        }
    }
}

echo js_encode($preguntesSeleccionades);
?>