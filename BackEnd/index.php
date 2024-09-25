<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>BackEnd/PHP</title>
</head>
<body>
    <?php
    session_start();
    $jsonFile = file_get_contents('backEnd/preguntes.json');
    $datos = json_decode($jsonFile, true);
    $preguntes = $datos["preguntes"];
    $totalPreguntes = count($preguntes);
    $arrayOpcions = ['A', 'B', 'C'];

    if (!isset($_SESSION['preguntesSeleccionades'])) {
        $preguntesSeleccionades = []; 
        
        while (count($preguntesSeleccionades) < 10) {
            $posAleatoria = rand(0, $totalPreguntes - 1);
            if (!in_array($preguntes[$posAleatoria], $preguntesSeleccionades)) {
                $preguntesSeleccionades[] = $preguntes[$posAleatoria];
            }
        }
        $_SESSION['preguntesSeleccionades'] = $preguntesSeleccionades;
        $_SESSION['posPreguntaActual'] = 0; 
        $_SESSION['score'] = 0; 
    }

    $preguntesSeleccionades = $_SESSION['preguntesSeleccionades'];
    $posPreguntaActual = $_SESSION['posPreguntaActual'];
    $preguntaActual = $preguntesSeleccionades[$posPreguntaActual];

    if (isset($_POST['respuestaSeleccionada'])) {
        $respuestaSeleccionada = $_POST['respuestaSeleccionada'];
        $respostes = $preguntaActual['respostes'];

        $correcta = false;
        foreach ($respostes as $resposta) {
            if ($resposta['id'] == $respuestaSeleccionada && $resposta['correcta']) {
                $correcta = true;
                break;
            }
        }

        if ($correcta) {
            $_SESSION['score']++;
            $mensaje = "¡Correcto!";
        } else {
            $respuestaCorrecta = array_search(true, array_column($respostes, 'correcta')) + 1;
            $mensaje = "Incorrecto. La respuesta correcta era: " . $respuestaCorrecta;
        }

        $_SESSION['posPreguntaActual']++;

        if ($_SESSION['posPreguntaActual'] >= count($preguntesSeleccionades)) {
            echo "<div id='partida'>";
            echo "<h3>¡Has terminado el cuestionario!</h3>";
            echo "<p>Tu puntuación es: " . $_SESSION['score'] . "/" . count($preguntesSeleccionades) . "</p>";
            echo '<form method="post"><button type="submit" name="reiniciar">Reiniciar</button></form></div>';
            session_destroy(); 
            exit;
        }
    }

    if (!isset($mensaje)) {
        $mensaje = ""; 
    }

    $preguntaActual = $preguntesSeleccionades[$posPreguntaActual];
    ?>

    <div id="partida">
        <h4>Pregunta: <?= $posPreguntaActual + 1 ?> / <?= count($preguntesSeleccionades) ?></h4>
        <h2><?= $preguntaActual["pregunta"] ?></h2>
        <table>
            <tr>
            <form method="POST">
                <?php
                foreach ($preguntaActual["respostes"] as $index => $resposta) {
                    $letra = $arrayOpcions[$index];
                    ?>
                    <td>
                        <button type="submit" name="respuestaSeleccionada" value="<?= $resposta['id'] ?>">
                            <?= $letra ?>
                        </button>
                    </td>
                    <td><p><?= $resposta["resposta"] ?></p></td></tr>
                    <?php
                }
                ?>
                </form>
            </tr>
        </table>
        <h3><?= $mensaje ?></h3>
    </div>
</body>
</html>