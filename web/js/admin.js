const createButton = document.getElementById('createButton');
const readButton = document.getElementById('readButton');
const updateButton = document.getElementById('updateButton');
const deleteButton = document.getElementById('deleteButton');

createButton.addEventListener('click', function() {
    let htmlString = ``;
    htmlString +=  `<h1>AFEGIR UNA PREGUNTA</h1>
                    <form action="/TR0_UMDP/back/agregarPregunta.php" method="POST" enctype="multipart/form-data">
                        <label for="pregunta">PREGUNTA</label>
                        <input type="text" id="pregunta" name="pregunta" required placeholder = "---"><br><br>
                        
                        <label for="imatge">IMATGE</label>
                        <input type="file" id="imatge" name="imatge" accept="image/*" ><br><br>
                        
                        <h3>-- RESPOSTES --</h3><br>
                        <label for="resposta1">Resposta 1</label>
                        <input type="text" id="resposta1" name="respostes[]" required placeholder = "---"><br>
                        
                        <label for="resposta2">Resposta 2</label>
                        <input type="text" id="resposta2" name="respostes[]" required placeholder = "---"><br>
                        
                        <label for="resposta3">Resposta 3</label>
                        <input type="text" id="resposta3" name="respostes[]" required placeholder = "---"><br><br>
                        
                        <label for="correcta">Posició de la resposta correcta (1, 2, 3):</label><br>
                        <input type="number" id="correcta" name="correcta" min="1" max="3" required placeholder = "---"><br><br>
                        
                        <button type="submit">Agregar Pregunta</button>
                    </form><br>
                    <button onclick="window.location.href='admin.html'">PÀGINA D'ADMIN</button>`;
    
    document.getElementById("admin").innerHTML = htmlString;
});

readButton.addEventListener('click', function() {
    fetch('./../back/mostrarPreguntes.php')
        .then(response => response.json())
        .then(data => {
            readPreguntes(data);
        })
        .catch(error => {
            console.error('Error al carregar les preguntes:', error);
        });
});

function readPreguntes(preguntes) {
    let htmlString = `
    <h1>AUTOESCOLA: PREGUNTES</h1>
    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <thead>
            <tr style="background-color: #f2f2f2;">
                <th style="border: 5px solid #ddd; padding: 8px; text-align: center;">Index</th>
                <th style="border: 5px solid #ddd; padding: 8px;">Pregunta</th>
                <th style="border: 5px solid #ddd; padding: 8px; text-align: center;">Imatge</th>
                <th style="border: 5px solid #ddd; padding: 8px;">Respostes</th>
            </tr>
        </thead>
        <tbody>`;

    for (let index = 0; index < preguntes.length; index++) {
        const pregunta = preguntes[index];
        htmlString += `
        <tr>
        <td style="border: 5px solid #ddd; padding: 8px; text-align: center;">${index + 1}</td>
            <td style="border: 5px solid #ddd; padding: 8px;">${pregunta.pregunta}</td>
            <td style="border: 5px solid #ddd; padding: 8px; text-align: center;">
                <img src="${pregunta.imatge}" width="100px" height="100px" alt="Imatge">
            </td>
            <td style="border: 5px solid #ddd; padding: 8px;"><ul>`;

        for (let indexResposta = 0; indexResposta < pregunta.respostes.length; indexResposta++) {
            const resposta = pregunta.respostes[indexResposta];
            const color = resposta.correcta === "1" ? 'green' : 'black'; // Cambiar el color según si es correcta o no
            htmlString += `<li style="color: ${color};">${resposta.resposta}</li>`;
        }
        htmlString += '</ul></td></tr>';
    }

    htmlString += `</tbody></table><br><button onclick="window.location.href='admin.html'">PÀGINA D'ADMIN</button>`;

    document.getElementById("admin").innerHTML = htmlString;
}

updateButton.addEventListener('click', function() {
    let htmlString = ``;
    htmlString += `<h1>ACTUALITZAR PREGUNTA</h1>
                    <form>
                        <label for = "idPregunta">Index Pregunta</label>
                        <input type="number" id="idPregunta" name="idPregunta" required placeholder = "---"><br>
                        <button id = "submitIDPregunta" type="submit">Actualitza</button><br>
                    </form>
                    <button onclick="window.location.href='admin.html'">PÀGINA D'ADMIN</button>`;
    
    document.getElementById("admin").innerHTML = htmlString;

    document.getElementById('submitIDPregunta').addEventListener('click', function(event) {
        event.preventDefault(); 
        
        const idPregunta = document.getElementById('idPregunta').value;

        fetch('./../back/mostrarPreguntes.php')
        .then(response => response.json())
        .then(data => {
            const id = parseInt(idPregunta, 10); 

            if (id >= 1 && id < data.length + 1) {
                console.log("Pregunta válida:", data[id - 1]);
                updatePregunta(data[id - 1]);
            } else {
                alert("El ID introduït no és vàlid. Si us plau, introdueix un ID correcte.");
            }
        })
        .catch(error => {
            console.error('Error al carregar les preguntes:', error);
        });
    });
});

function updatePregunta(pregunta) {
    let indexResposta = pregunta.respostes.findIndex(resposta => resposta.correcta === "1") + 1; // Busca l'index de la resposta correcta
    let htmlString = '';
    htmlString += `<h1>ACTUALITZAR PREGUNTA AMB ID '${pregunta.id}'</h1>
    <form action="/TR0_UMDP/back/actualitzarPregunta.php?idPregunta=${pregunta.id}" method="POST" enctype="multipart/form-data">
        <label for="pregunta">PREGUNTA</label>
        <input type="text" id="pregunta" name="pregunta" required placeholder="${pregunta.pregunta}"><br><br>
        
        <label for="imatge">IMATGE</label><br>
        <img src="${pregunta.imatge}" width="300px" height="300px" style="display: block; margin: auto;"><br>
        <input type="file" id="imatge" name="imatge" accept="image/*"><br><br>
        
        <h3>-- RESPOSTES --</h3><br>`;
        
    pregunta.respostes.forEach((resposta, index) => {
        htmlString += `
        <label for="resposta${index + 1}">Resposta ${index + 1}</label>
        <input type="text" id="resposta${index + 1}" name="respostes[]" required placeholder="${resposta.resposta}"><br>
        <input type="hidden" name="resposta_ids[]" value="${resposta.id}"> <!-- Aquí se añade el id de cada resposta -->
        `;
    });
    
    htmlString += `
        <label for="correcta">Posició de la resposta correcta (1, 2, 3):</label><br>
        <input type="number" id="correcta" name="correcta" min="1" max="3" required placeholder="${indexResposta}"><br><br>
        
        <button type="submit">Actualizar Pregunta</button>
    </form>
    <br><button onclick="window.location.href='admin.html'">PÀGINA D'ADMIN</button>`;
    
    document.getElementById("admin").innerHTML = htmlString;
}

deleteButton.addEventListener('click', function() {
    let htmlString = ``;
    htmlString += `<h1>BORRAR PREGUNTA</h1>
                    <form>
                        <label for = "idPregunta">Index Pregunta</label>
                        <input type="number" id="idPregunta" name="idPregunta" required placeholder = "---"><br>
                        <button id = "borrarPregunta" type="submit">Esborrar</button><br>
                    </form>
                    <button onclick="window.location.href='admin.html'">PÀGINA D'ADMIN</button>`;
    document.getElementById("admin").innerHTML = htmlString;

    document.getElementById('borrarPregunta').addEventListener('click', function(event) {
        event.preventDefault();
        
        const idPregunta = document.getElementById('idPregunta').value;

        fetch('./../back/mostrarPreguntes.php')
        .then(response => response.json())
        .then(data => {
            const id = parseInt(idPregunta, 10); 

            if (id >= 1 && id < data.length + 1) {
                console.log("Pregunta válida:", data[id - 1]);
                deletePregunta(data[id - 1]);
            } else {
                alert("El ID introduït no és vàlid. Si us plau, introdueix un ID correcte.");
            }
        })
        .catch(error => {
            console.error('Error al carregar les preguntes:', error);
        });
    });
});

function  deletePregunta(pregunta) {
    let respostaCorrecta = pregunta.respostes.find(resposta => resposta.correcta === "1")?.resposta
    let htmlString = '';
    htmlString += `<h1>BORRAR PREGUNTA AMB ID '${pregunta.id}'</h1>
    <form action="/TR0_UMDP/back/borrarPregunta.php?idPregunta=${pregunta.id}" method="POST" enctype="multipart/form-data">
    <h3>PREGUNTA</h3>
    <p>${pregunta.pregunta}</p>
    <h3>IMATGE</h3>
    <img src="${pregunta.imatge}" width="300px" height="300px" style="display: block; margin: auto;"><br>
    <h3>RESPOSTES</h3>
    <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
        <thead>
            <tr>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">Resposta 1</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">Resposta 2</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">Resposta 3</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">${pregunta.respostes[0].resposta}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${pregunta.respostes[1].resposta}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${pregunta.respostes[2].resposta}</td>
            </tr>
        </tbody>
    </table><br>
    <h3>RESPOSTA CORRECTE</h3>
    <p id = "respostaCorrecte" style="text-align: center; margin: 0 auto; width: 50%; background-color: green; color: white; padding: 10px; border-radius: 5px;">${respostaCorrecta}<p>
    <button type="submit" style = "background-color: red">Borrar Pregunta</button>
    </form>
    <button onclick="window.location.href='admin.html'">PÀGINA D'ADMIN</button>`;
    document.getElementById("admin").innerHTML = htmlString;
}
