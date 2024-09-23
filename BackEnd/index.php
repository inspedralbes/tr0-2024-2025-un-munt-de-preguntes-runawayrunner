<?php
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Act2: Aivan Antonio</title>
</head>
<body>
    <?php
    session_start();
    $jsonFile = file_get_contents('backEnd/preguntes.json');
    $datos = json_decode($jsonFile, true);
    $preguntes = $datos["preguntes"];
    $totalPreguntes = count($preguntes);
    $posPreguntaActual = 0;
    $arrayOpcions = ['A', 'B', 'C'];
    ?>
    <div id ="partida">
        <?php
        if (!isset($_POST['preguntaActual'])) {

            // guarda las 10 preguntas selecionadas
            $preguntesSeleccionades = []; 
            // guarda la posi de las preguntas selecionadas del .json
            $posPreguntesSeleccionades = [];
            
            while (count($preguntesSeleccionades) < 10) {
                $posAleatoria = rand(0, $totalPreguntes - 1);
                
                // comproba si la posicion selecionada ya esta eligida
                if (!in_array($posAleatoria, $posPreguntesSeleccionades)) {
                    $preguntesSeleccionades[] = $preguntes[$posAleatoria];
                    $posPreguntesSeleccionades[] = $posAleatoria;
                }
            }
        }
        $preguntaActual = $preguntesSeleccionades[$posPreguntaActual];
        ?>
        <h4>Progress: <?=  $posPreguntaActual?>%</h4>
        <h2><?= $preguntaActual["pregunta"]?></h2>
        <table>
            <tr>
        <?php
            foreach ($preguntaActual["respostes"] as $index => $resposta) {
                $letra = $arrayOpcions[$index];
                ?>
                    <td><button onclick=""><?= $letra ?></button></td><td><p><?= $resposta["resposta"] ?></p></td></tr>
                <?php
            }
        ?>
        </table>
    </div>
</div>
</body>
</html>