// Obtén el parámetro 'id' de la URL
const urlParams = new URLSearchParams(window.location.search);
const email = urlParams.get('email');

// Función para obtener un solo registro por su ID
function getContactById(email) {
    // Realiza una solicitud para obtener el registro por su ID, por ejemplo:
    const request = new XMLHttpRequest();
    request.open('GET', "http://localhost:8000/contactos/" + email);
    request.send();

    request.onload = (e) => {
        const response = request.responseText;
        const contacto = JSON.parse(response);

        // Ahora puedes mostrar los datos del registro en la página "ver.html" como valores predeterminados en campos de entrada
        const emailInput = document.getElementById("emailInput");
        const nombreInput = document.getElementById("nombreInput");
        const telefonoInput = document.getElementById("telefonoInput");

        emailInput.value = contacto.email;
        nombreInput.value = contacto.nombre;
        telefonoInput.value = contacto.telefono;
    };
}

// Llama a la función para obtener y mostrar el registro
getContactById(email);

function updateData(email, nombre, telefono) {
    var request = new XMLHttpRequest();
    var url = "http://localhost:8000/contactos/" + email;

    var data = {
        email: email,
        nombre: nombre,
        telefono: telefono
    };

    request.open('PUT', url, true);
    request.setRequestHeader('Content-type','application/json; charset=utf-8');

    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            alert(request.responseText);
            window.location.href = 'index.html';
        }
    }

    request.send(JSON.stringify(data));
}
