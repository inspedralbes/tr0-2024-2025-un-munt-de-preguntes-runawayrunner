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
            htmlString += `<h3>${pregunta.pregunta}</h3>`;
            htmlString += `<img id="imagenResultado" src="${pregunta.imatge}" width="200px" height="200px" style="display: block; margin: 0 auto;"><br>`;
            let opcions = ['A','B','C'];
            
            htmlString += `<table><tr>`;
            for (let indexResposta = 0; indexResposta < opcions.length; indexResposta++) {
                resposta = pregunta.respostes[indexResposta];
                htmlString += `<td><button onclick="processarResposta(${preguntaActual}, ${indexResposta})">${opcions[indexResposta]}</button></td><td>${resposta.resposta}</td></tr>`;
            }
            htmlString += `</table>`;
        }
        document.getElementById("partida").innerHTML = htmlString;
    }

    function processarResposta(preguntaActual, indexResposta) {
        console.log(`Pregunta actual: ${preguntaActual}, Respuesta seleccionada: ${indexResposta}`);
        let pregunta = dadesPreguntes[preguntaActual];
        
        let imagenResultado = document.getElementById("imagenResultado");
        if (pregunta.respostes[indexResposta].correcta) {
            imagenResultado.src = "img/correcte.png";
        } else {
            imagenResultado.src = "img/incorrecte.png";
        }
        
        setTimeout(() => {
            preguntaActual++;
            mostrarPregunta(dadesPreguntes, preguntaActual);
        }, 2000); 
    }

    
