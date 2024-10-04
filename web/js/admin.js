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
    fetch('http://localhost/TR0_UMDP/back/mostrarPreguntes.php')
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
                <th style="border: 5px solid #ddd; padding: 8px; text-align: center;">ID</th>
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
            <td style="border: 5px solid #ddd; padding: 8px; text-align: center;">${pregunta.id}</td>
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
    fetch('http://localhost/TR0_UMDP/back/mostrarPreguntes.php')
        .then(response => response.json())
        .then(data => {
            updatePregunta(data);
        })
        .catch(error => {
            console.error('Error al carregar les preguntes:', error);
        });
});

function updatePregunta(preguntes) {
    //
}

deleteButton.addEventListener('click', function() {
    fetch('http://localhost/TR0_UMDP/back/mostrarPreguntes.php')
        .then(response => response.json())
        .then(data => {
            deletePregunta(data);
        })
        .catch(error => {
            console.error('Error al carregar les preguntes:', error);
        });
});

function  deletePregunta(preguntes) {
    //
}
