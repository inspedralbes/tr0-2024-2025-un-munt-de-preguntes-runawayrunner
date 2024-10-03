let preguntaActual = 0;
let estatDeLaPartida = [];
let contador = 0;
let dadesPreguntes = [];


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
        iniciarPartida(nomUsuari);
    });
}

document.getElementById("partida").innerHTML = getFormHTML();

setupFormListener();

function iniciarPartida(nomUsuari) {
    document.getElementById('temps').style.visibility = 'visible';
    console.log(`Nom del jugador: ${nomUsuari}`);
    fetch('http://localhost/TR0_UMDP/back/getPreguntes.php')
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
            let htmlString = ``;
            htmlString += `<h3>Has completat todes les preguntes!</h3>`;
            htmlString += `<p>Gracies por participar.</p>`;
            htmlString += `<p>Temps: ${contador} segons</p>`;
            htmlString += `<p>${correctasCount}/10</p>`;
            
            console.log(estatDeLaPartida);
            htmlString += `<h4>Resum:</h4>`;
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
    contador = 0;

    // Reiniciar el temporizador
    document.getElementById('timer').innerHTML = '';

    // Mostrar el nou formulari
    document.getElementById("partida").innerHTML = getFormHTML();

    // Gestiona les opcions del form
    setupFormListener();
}
