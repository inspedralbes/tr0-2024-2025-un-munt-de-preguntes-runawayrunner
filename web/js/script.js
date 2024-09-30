let preguntaActual = 0;
let correctes = 0;
let jsonPreguntes = [];

fetch('http://localhost/TR0_UMDP/back/getPreguntes.php')
    .then(response => response.json())
    .then(info => {    
        console.log(info);
        dadesPreguntes = info;
        mostrarPregunta(dadesPreguntes, preguntaActual);
    })
    .catch(error => {
        console.error('Error al cargar las preguntas:', error);
    });

function mostrarPregunta(data, preguntaActual) {
    let htmlString = '';

    if (preguntaActual < data.length) {
        pregunta = data[preguntaActual];
        htmlString += `<h2>${pregunta.pregunta}</h2>`;
        htmlString += `<img id="fotoPregunta" src="${pregunta.imatge}" width="200px" height="200px" style="display: block; margin: 0 auto;"><br>`;
        let opcions = ['A','B','C'];

        htmlString += `<table><tr>`;
        for (let indexResposta = 0; indexResposta < opcions.length; indexResposta++) {
            resposta = pregunta.respostes[indexResposta];
            htmlString += `<td><button class="botonResposta" onclick="processarResposta(${preguntaActual}, ${indexResposta}, ${pregunta.id})">${opcions[indexResposta]}</button></td><td>${resposta.resposta}</td></tr>`;
        }
        htmlString += `</table>`;
    } else {
        finalizarSesion();
    }
    document.getElementById("partida").innerHTML = htmlString;
}

function processarResposta(preguntaActual, indexResposta, preguntaID) {
    const botones = document.querySelectorAll(".botonResposta");
    botones.forEach(boton => boton.disabled = true);

    console.log(`Pregunta actual: ${preguntaActual}, Respuesta seleccionada: ${indexResposta}`);
    let pregunta = dadesPreguntes[preguntaActual];

    jsonPreguntes.push({
        pregunta: preguntaID,
        respuesta: indexResposta
    });

    setTimeout(() => {
        preguntaActual++;
        mostrarPregunta(dadesPreguntes, preguntaActual);
    }, 1000); 
}

function finalizarSesion() {
    fetch('http://localhost/TR0_UMDP/back/finalitza.php', {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(jsonPreguntes),
        }
    )
        .then((response) => response.json())
        .then((data) => {
            console.log("hola")
            let htmlString = `<h3>Has completat todes les preguntes!</h3>`;
            htmlString += `<p>Gracies por participar.</p>`;
            htmlString += `<p>${data}/10</p>`;
            
        
            htmlString += `<h4>Respuestas seleccionadas:</h4>`;
            htmlString += `<ul>`;
            jsonPreguntes.forEach((respuesta, index) => {
                htmlString += `<li>Pregunta ${index}: Respuesta ${respuesta.respuesta}</li>`;
            });
            htmlString += `</ul>`;
        
            htmlString += `<button onclick="reiniciarJuego()">Reiniciar</button>`;
            document.getElementById("partida").innerHTML = htmlString;
        })
        .catch((error) => console.log("Error al enviar les respostes:", error));
}

function reiniciarJuego() {
    console.clear();
    preguntaActual = 0; 
    correctes = 0;
    jsonPreguntes = [];
    mostrarPregunta(dadesPreguntes, preguntaActual);
}
