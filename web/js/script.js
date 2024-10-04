let preguntaActual = 0;
let estatDeLaPartida = [];
let contador = 0;
let nPreguntes;

function getFormHTML() {
    return `
    <img src="img/cotxe.gif" width="30%">
    <h1>TEST AUTOESCOLA</h1>
    <h5>TR0: UN MUNT DE PREGUNTES</h5>
        <form id="formNom">
            <label for="nomUsuari">Nom jugador</label><br>
            <input type="text" id="nomUsuari" required placeholder="---"><br><br>
            <label for="nPreguntes">Cantitat de preguntes</label><br>
            <input type="number" id="nPreguntes" required placeholder="---">
            <br><br>
            <button type="submit">COMENÇAR</button>
            <button type="reset">ESBORRAR</button>
            </form>
    `;
}

function setupFormListener() {
    document.getElementById('formNom').addEventListener('submit', function(event) {
        event.preventDefault(); 
        const nomUsuari = document.getElementById('nomUsuari').value;
        nPreguntes = document.getElementById('nPreguntes').value;
        iniciarPartida(nomUsuari, nPreguntes);
    });
}

document.getElementById("partida").innerHTML = getFormHTML();

setupFormListener();

function iniciarPartida(nomUsuari, nPreguntes) {
    document.getElementById('temps').style.visibility = 'visible';
    console.log(`Nom del jugador: ${nomUsuari}`);
    fetch(`./../back/getPreguntes.php?nPreguntes=${nPreguntes}`)
    .then(response => response.json())
    .then(info => {
        dadesPreguntes = info;
        mostrarPregunta(dadesPreguntes, preguntaActual);
        myTimer = setInterval(myCounter, 1000);
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

        htmlString += `<table class="tablaRespuestas"><tr>`;
        for (let indexResposta = 0; indexResposta < opcions.length; indexResposta++) {
            resposta = pregunta.respostes[indexResposta];
            htmlString += `<td class="pequena"><button class="botonResposta" id="processarResposta(${preguntaActual}, ${indexResposta}, ${pregunta.id})">${opcions[indexResposta]}</button></td><td>${resposta.resposta}</td></tr>`;
        }
        htmlString += `</table>`;
    } else {
        document.getElementById('temps').style.visibility = 'hidden';
        clearInterval(myTimer);
        finalizarSesion();
    }
    document.getElementById("partida").innerHTML = htmlString;

    const botones = document.querySelectorAll(".botonResposta");
    botones.forEach((boton, index) => {
        const preguntaID = pregunta.id;
        boton.addEventListener('click', () => processarResposta(preguntaActual, index, preguntaID));
    });
}

function myCounter(params) {
    document.getElementById("timer").innerHTML = contador++;
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
    }, 750); 
}

function finalizarSesion() {
    fetch('./../back/finalitza.php', {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(estatDeLaPartida),
    })
    .then((response) => response.json())
    .then((data) => {
        const correctasCount = data.filter(resultat => resultat.correcta).length;
        let htmlString = ``;
        htmlString += `<h3>Has completat todes les preguntes!</h3>`;
        htmlString += `<p>Gracies por participar.</p>`;
        htmlString += `<p>Temps: ${contador} segons</p>`;
        htmlString += `<p>${correctasCount}/${nPreguntes}</p>`;
        
        console.log(estatDeLaPartida);

        // Formato mejorado para el resumen
        htmlString += `<h4>Resum:</h4>`;
        htmlString += `<table class="resumTable" style="width: 100%; border-collapse: collapse;">`;
        htmlString += `<thead><tr style="background-color: #4CAF50; color: white; text-align: center;">
                    <th style="border: 1px solid #ddd; padding: 8px;">Pregunta</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Resposta</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Resultat</th>
                    </tr></thead>`;
        htmlString += `<tbody>`;
        data.forEach((resposta, index) => {
            const resultat = resposta.correcta ? "Correcta" : "Incorrecta"; // Verificar si la respuesta es correcta
            htmlString += `<tr>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${index + 1}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${resposta.resposta}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: center; color: ${resposta.correcta ? 'green' : 'red'};">${resultat}</td>
            </tr>`;
        });
        htmlString += `</tbody></table><br>`;

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
    contador = 0;

    // Reiniciar el temporizador
    document.getElementById('timer').innerHTML = '';

    // Mostrar el nou formulari
    document.getElementById("partida").innerHTML = getFormHTML();

    // Gestiona les opcions del form
    setupFormListener();
}
