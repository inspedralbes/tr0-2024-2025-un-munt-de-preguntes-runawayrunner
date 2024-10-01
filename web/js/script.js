let preguntaActual = 0;
let estatDeLaPartida = [];

function getFormHTML() {
    return `
        <h1>TR0: UN MUNT DE PREGUNTES</h1>
        <form id="formNom">
            <label for="nomUsuari">Nom jugador:</label>
            <input type="text" id="nomUsuari" required>
            <br><br>
            <button type="submit">Començar</button>
            <button type="reset">Esborrar</button>
        </form>
    `;
}

function setupFormListener() {
    document.getElementById('formNom').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting the traditional way
        const nomUsuari = document.getElementById('nomUsuari').value;
        iniciarPartida(nomUsuari); // Start the game with the username
    });
}

document.getElementById("partida").innerHTML = getFormHTML();

setupFormListener();

function iniciarPartida(nomUsuari) {
    console.log(`Nom del jugador: ${nomUsuari}`);
    fetch('http://localhost/TR0_UMDP/back/getPreguntes.php')
        .then(response => response.json())
        .then(info => {
            dadesPreguntes = info;
            mostrarPregunta(dadesPreguntes, preguntaActual);
        })
        .catch(error => {
            console.error('Error al cargar las preguntas:', error);
        });
}

function mostrarPregunta(data, preguntaActual) {
    let htmlString = '';
    let pregunta;

    if (preguntaActual < data.length) {
        pregunta = data[preguntaActual];
        htmlString += `<h2>${pregunta.pregunta}</h2>`;
        htmlString += `<img id="fotoPregunta" src="${pregunta.imatge}" width="200px" height="200px" style="display: block; margin: 0 auto;"><br>`;
        let opcions = ['A','B','C'];

        htmlString += `<table><tr>`;
        for (let indexResposta = 0; indexResposta < opcions.length; indexResposta++) {
            resposta = pregunta.respostes[indexResposta];
            // htmlString += `<td><button class="botonResposta" onclick="processarResposta(${preguntaActual}, ${indexResposta}, ${pregunta.id})">${opcions[indexResposta]}</button></td><td>${resposta.resposta}</td></tr>`;
            htmlString += `<td><button class="botonResposta" id="processarResposta(${preguntaActual}, ${indexResposta}, ${pregunta.id})">${opcions[indexResposta]}</button></td><td>${resposta.resposta}</td></tr>`;
        }
        htmlString += `</table>`;
    } else {
        finalizarSesion();
    }
    document.getElementById("partida").innerHTML = htmlString;

    const botones = document.querySelectorAll(".botonResposta");
    botones.forEach((boton, index) => {
        const preguntaID = pregunta.id;
        boton.addEventListener('click', () => processarResposta(preguntaActual, index, preguntaID));
    });
}

function processarResposta(preguntaActual, indexResposta, preguntaID) {
    const botones = document.querySelectorAll(".botonResposta");
    botones.forEach(boton => boton.disabled = true);

    console.log(`Pregunta actual: ${preguntaActual}, Respuesta seleccionada: ${indexResposta}`);

    estatDeLaPartida.push({
        pregunta: preguntaID,
        resposta: indexResposta
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
            body: JSON.stringify(estatDeLaPartida),
        }
    )
        .then((response) => response.json())
        .then((data) => {
            const correctasCount = data.filter(resultat => resultat.correcta).length;
            let htmlString = `<h3>Has completat todes les preguntes!</h3>`;
            htmlString += `<p>Gracies por participar.</p>`;
            htmlString += `<p>${correctasCount}/10</p>`;
            
            console.log(estatDeLaPartida);
            htmlString += `<h4>Respuestas seleccionadas:</h4>`;
            htmlString += `<ul>`;
            data.forEach((resposta, index) => {
                htmlString += `<li>Pregunta ${index+1}:  ${resposta.resposta}</li>`;
            });
            htmlString += `</ul>`;
        
            htmlString += `<button id="reiniciarJuego">Reiniciar</button>`;
            document.getElementById("partida").innerHTML = htmlString;

            const reiniciarButton = document.getElementById("reiniciarJuego");
            reiniciarButton.addEventListener("click", reiniciarJuego);
        })
        .catch((error) => console.log("Error al enviar les respostes:", error));
}

function reiniciarJuego() {
    console.clear();
    preguntaActual = 0;
    estatDeLaPartida = [];

    // Mostrar el formulari
    document.getElementById("partida").innerHTML = getFormHTML();

    // Gestiona les opcions del form
    setupFormListener();
}
