let data;
let currentQuestionIndex = 0;

fetch('http://localhost/umdp/preguntes.json')
  .then(response => response.json())
  .then(info => {
    data = info.preguntes;
    mostrarPregunta();
  });

function mostrarPregunta() {
  if (currentQuestionIndex < data.length) {
    const pregunta = data[currentQuestionIndex];
    let htmlString = '';

    htmlString += `<h3>${pregunta.pregunta}</h3>`;

    for (let indexResposta = 0; indexResposta < pregunta.respostes.length; indexResposta++) {
      htmlString += `<button onclick="contestar(${indexResposta})">${pregunta.respostes[indexResposta].resposta}</button>`;
    }
    document.getElementById("partida").innerHTML = htmlString;
  } else {
    document.getElementById("partida").innerHTML = "<h3>¡Has respondido todas las preguntas!</h3>";
  }
}

function contestar(index) {
  console.log(`Respuesta seleccionada: ${data[currentQuestionIndex].respostes[index].resposta}`);
  currentQuestionIndex++;
  mostrarPregunta();
}
  

/*for (let nPregunta = 0; nPregunta < data.preguntes.length; nPregunta++) {
    let n = data.preguntes[nPregunta]
    document.write("<h4>" + (nPregunta + 1) + ") " + n.pregunta + "</h4>");
    //document.write("<img src=" + n.pregunta[""] + ">");

    let opcions = ['A','B','C']
    let tableHtml = "<table>";

    for (let i = 0; i < opcions.length; i++) {
        tableHtml += "<tr>" +
            "<td><button onclick='handleAnswer(\"" + opcions[i] + "\", " + nPregunta + ")'>" + opcions[i] + "</button><br>" +
            "<td>" + n.respostes[i].resposta +
            "</tr>";
    }

    tableHtml += "</table>";

    document.write(tableHtml);

    /*document.write("<table>" +
      "<tr>" +
        "<td>" + "<button>" + opcions[0] + "</button><br>" +
        "<td>" + n.respostes[0].resposta +
      "</tr>" +
      "<tr>" +
        "<td>" + "<button>" + opcions[1] + "</button><br>" +
        "<td>" + n.respostes[1].resposta +
      "</tr>" +
      "<tr>" +
        "<td>" + "<button>" + opcions[2] + "</button><br>" +
        "<td>" + n.respostes[2].resposta +
      "</tr>" +
      "</table>"
    )*/

    document.write("<br>");
//}

function handleAnswer(opcion, preguntaIndex) {
  $correcte = 0;
  if (data.preguntes.preguntaIndex.respostes.opcion.correcta) {
    correcte++;
  }
}