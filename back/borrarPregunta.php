<?php
include('connexio.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $idPregunta = $_GET['idPregunta'];

    $sql_respostes = "DELETE FROM respostes WHERE pregunta_id = '$idPregunta'";
    
    if ($conn->query($sql_respostes) === TRUE) {
        $sql_pregunta = "DELETE FROM preguntes WHERE id = '$idPregunta'";

        if ($conn->query($sql_pregunta) === TRUE) {
            ?>
            <h1>Pregunta esborrada correctament!</h1>
            <button onclick="window.location.href='/TR0_UMDP/web/admin.html'">PÀGINA D'ADMIN</button>
            <?php
        } else {
            echo "Error al esborrar la pregunta: " . $conn->error;
        }
    } else {
        echo "Error al esborrar les respostes: " . $conn->error;
    }
    $conn->close();
}
?>