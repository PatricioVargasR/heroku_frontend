const SERVER_URL = "http://localhost:8000";
const CONTACTS_ENDPOINT = "/contactos";
const urlParams = new URLSearchParams(window.location.search);
const email = urlParams.get('email');

console.log(email);

function getContactById(email) {
    console.log(email);
    const token = sessionStorage.getItem('token');

    if (!token) {
        console.error('Token not found. Redirecting to login page.');
        window.location.href = '/sesion';
        return;
    }

    console.log(email);    
    const request = new XMLHttpRequest();
    request.open('GET', "http://localhost:8000/contactos/" + email);
    request.setRequestHeader('Authorization', `Bearer ${token}`);
    request.onload = (e) => {
        if (request.status === 200) {
            const response = request.responseText;
            const contacto = JSON.parse(response);

            console.log(contacto);
            const emailInput = document.getElementById("emailInput");
            const nombreInput = document.getElementById("nombreInput");
            const telefonoInput = document.getElementById("telefonoInput");

            emailInput.value = contacto.email;
            nombreInput.value = contacto.nombre;
            telefonoInput.value = contacto.telefono;
        } else {
            handleErrorResponse(request.status, request.statusText);
        }
    };

    request.onerror = (error) => {
        console.error('Error de red o CORS:', error);
    };

    request.send();
}

getContactById(email);


function updateData(email, nombre, telefono) {
    const token = sessionStorage.getItem('token');

    if (!token) {
        console.error('Token not found. Redirecting to login page.');
        window.location.href = '/sesion';
        return;
    }

    var request = new XMLHttpRequest();
    var url = `${SERVER_URL}${CONTACTS_ENDPOINT}/${email}`;
    var data = {
        email: email,
        nombre: nombre,
        telefono: telefono
    };

    request.open('PUT', url, true);
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    request.setRequestHeader('Authorization', `Bearer ${token}`);

    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status === 200) {
                alert(request.responseText);
                window.location.href = '/';
            } else {
                handleErrorResponse(request.status, request.statusText);
            }
        }
    };

    request.send(JSON.stringify(data));
}
