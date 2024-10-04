<?php
include('connexio.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $pregunta = $_POST['pregunta'];
    $respostes = $_POST['respostes'];
    $correcta = $_POST['correcta'];

    $target_dir = "uploads/";
    $imatge = $_FILES["imatge"]["name"];
    $target_file = $target_dir . basename($imatge);
    move_uploaded_file($_FILES["imatge"]["tmp_name"], $target_file);

    $sql_pregunta = "INSERT INTO preguntes (pregunta, imatge) VALUES ('$pregunta', '$imatge')";
    
    if ($conn->query($sql_pregunta) === TRUE) {
        $pregunta_id = $conn->insert_id;

        for ($i = 0; $i < count($respostes); $i++) {
            $esCorrecta = ($i + 1 == $correcta) ? 1 : 0;
            $resposta = $respostes[$i];
            $sql_resposta = "INSERT INTO respostes (pregunta_id, resposta, correcta) 
                             VALUES ('$pregunta_id', '$resposta', '$esCorrecta')";
            $conn->query($sql_resposta);
        }
        ?>
        <h1>Pregunta i respostes afegides correctament!</h1>
        <button onclick="window.location.href='/TR0_UMDP/web/admin.html'">PÀGINA D'ADMIN</button>
<?php
    } else {
        echo "Error: " . $sql_pregunta . "<br>" . $conn->error;
    }

    $conn->close();
}
?>