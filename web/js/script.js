function començarPartit() {
    fetch('http://localhost/TR0_UMDP/back/getPreguntes.php')
        .then(response => response.json())
        .then(info => {     
            console.log(info);
            mostrarPregunta(info);
        })
        .catch(error => {
            console.error('Error al cargar las preguntas:', error);
        });
    
    function mostrarPregunta(data) {    
        let preguntaActual = 0;
        let htmlString = '';
    
        if (preguntaActual < data.length) {
            pregunta = data[preguntaActual];
            htmlString += `<img src="${pregunta.imatge}">`
            htmlString += `<h3>${pregunta.pregunta}</h3>`;
            let opcions = ['A','B','C'];
    
            htmlString += `<table><tr>`;
            for (let indexResposta = 0; indexResposta < opcions.length; indexResposta++) {
                resposta = pregunta.respostes[indexResposta];
                htmlString += `<td><button onclick="processarResposta()">${opcions[indexResposta]}</button></td><td>${resposta.resposta}</td></tr>`;
            }
        }
        document.getElementById("partida").innerHTML = htmlString;
    }

    function processarResposta() {
        console.log(`HOLA`);
        //console.log(`Pregunta: ${indexResposta + 1}, Opcion seleccionada: ${pregunta.respostes[indexResposta].resposta}`);
        
    }
}

    