<?php
include('connexio.php');
$idPregunta = $_GET['idPregunta'];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Primero, obtenemos los datos actuales de la pregunta desde la base de datos
    $sql = "SELECT pregunta, imatge FROM preguntes WHERE id = '$idPregunta'";
    $result = $conn->query($sql);
    $pregunta_actual = $result->fetch_assoc();

    // Si encontramos la pregunta, procedemos
    if ($pregunta_actual) {
        // Verificamos si se enviaron nuevos datos y usamos los antiguos si están vacíos
        $pregunta = !empty($_POST['pregunta']) ? $_POST['pregunta'] : $pregunta_actual['pregunta'];
        $imatge = !empty($_FILES['imatge']['name']) ? $_FILES['imatge']['name'] : $pregunta_actual['imatge'];

        // Si hay una nueva imagen, la movemos
        if (!empty($_FILES["imatge"]["name"])) {
            $target_dir = "uploads/";
            $target_file = $target_dir . basename($imatge);
            move_uploaded_file($_FILES["imatge"]["tmp_name"], $target_file);
        }

        // Actualizamos la pregunta
        $sql_pregunta = "UPDATE preguntes SET pregunta = '$pregunta', imatge = '$imatge' WHERE id = '$idPregunta'";
        
        if ($conn->query($sql_pregunta) === TRUE) {
            // Actualizamos las respuestas
            for ($i = 0; $i < count($_POST['respostes']); $i++) {
                $resposta_id = $_POST['resposta_ids'][$i]; // Asegúrate de que este campo hidden está en el formulario
                $resposta = !empty($_POST['respostes'][$i]) ? $_POST['respostes'][$i] : $pregunta_actual['respostes'][$i]['resposta'];
                $esCorrecta = ($i + 1 == $_POST['correcta']) ? 1 : 0;

                $sql_resposta = "UPDATE respostes SET resposta = '$resposta', correcta = '$esCorrecta' WHERE id = '$resposta_id'";
                $conn->query($sql_resposta);
            }
            ?>
            <h1>Pregunta i respostes actualitzades correctament!</h1>
            <button onclick="window.location.href='/TR0_UMDP/web/admin.html'">PÀGINA D'ADMIN</button>
            <?php
        } else {
            echo "Error: " . $sql_pregunta . "<br>" . $conn->error;
        }
    } else {
        echo "Error: No s'ha pogut trobar la pregunta.";
    }

    $conn->close();
}
?>