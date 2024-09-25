let preguntaActual = 0;
let dadesPreguntes = [];

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
            htmlString += `<img src="${pregunta.imatge}">`
            htmlString += `<h3>${pregunta.pregunta}</h3>`;
            let opcions = ['A','B','C'];
    
            htmlString += `<table><tr>`;
            for (let indexResposta = 0; indexResposta < opcions.length; indexResposta++) {
                resposta = pregunta.respostes[indexResposta];
                htmlString += `<td><button onclick="processarResposta(${preguntaActual}, ${indexResposta})">${opcions[indexResposta]}</button></td><td>${resposta.resposta}</td></tr>`;
            }
        }
        document.getElementById("partida").innerHTML = htmlString;
    }
    function processarResposta(preguntaActual, indexResposta) {
        console.log(`Pregunta actual: ${preguntaActual}, Respuesta seleccionada: ${indexResposta}`);
        preguntaActual++;
        let htmlStringResposta = '';

        if (pregunta.respostes[indexResposta].correcta) {
            htmlStringResposta += `<h4>Resposta correcte</h4>`;
        } else {
            htmlStringResposta += `<h4>Resposta incorrecte</h4>`;
        }

        const resultatRespostaElement = document.getElementById("resposta");
        if (resultatRespostaElement) {
            resultatRespostaElement.innerHTML = htmlStringResposta;
        } else {
            console.error("El elemento 'resposta' no se encontró en el DOM.");
        }

        document.getElementById("resultatResposta").innerHTML = htmlStringResposta;

        setTimeout(() => {
            mostrarPregunta(dadesPreguntes, preguntaActual);
        }, 3000); 
    }

    
