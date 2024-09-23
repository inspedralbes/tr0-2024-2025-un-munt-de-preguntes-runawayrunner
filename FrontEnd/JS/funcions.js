let data;
let preguntaActual = 0;
let correcte = 0;
let error = 0;

fetch('http://localhost/umdp/preguntes.json')
  .then(response => response.json())
  .then(info => {
    data = info.preguntes;
    mostrarPregunta();
  });

function mostrarPregunta() {
  if (preguntaActual < data.length) {
    pregunta = data[preguntaActual];
    let htmlString = '';
    let opcions = ['A','B','C']
    
    htmlString += `<h4>Progress: ${preguntaActual+1}/${data.length}</h4><h3>${pregunta.pregunta}</h3><table><tr>`;

    for (let indexResposta = 0; indexResposta < pregunta.respostes.length; indexResposta++) {
      htmlString += `<td><button onclick="contestar(${indexResposta})">${opcions[indexResposta]}</button></td><td>${pregunta.respostes[indexResposta].resposta}</td></tr>`;
    }
    document.getElementById("partida").innerHTML = htmlString;
  } else {
    let missatgeFinal = `
      <h1>¡Has respondido todas las preguntas!</h1><br>
      <h4>Respostes correctes: ${correcte}</h4>
      <h4>Respostes incorrectes: ${error}</h4>
    `;
    document.getElementById("partida").innerHTML = missatgeFinal;
  }
}

function contestar(indexResposta) {
  console.log(`Pregunta: ${preguntaActual + 1}, Opcion seleccionada: ${pregunta.respostes[indexResposta].resposta}`);
  // Check if the answer is correct
  if (pregunta.respostes[indexResposta].correcta) {
    correcte++;
  } else {
    error++;
  }

  preguntaActual++; // Move to the next question
  mostrarPregunta(); // Show the next question
}
