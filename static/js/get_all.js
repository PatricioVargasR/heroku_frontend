const SERVER_URL = "http://localhost:8000";
const CONTACTS_ENDPOINT = "/contactos";

function getAll() {
    const token = sessionStorage.getItem('token');

    if (!token) {
        // Manejar la falta de token, por ejemplo, redirigir a la página de inicio de sesión
        console.error('Token not found. Redirecting to login page.');
        window.location.href = '/sesion';  // Ajusta la URL según tu estructura de rutas
        return;
    }

    checkServerStatus();

    const request = new XMLHttpRequest();
    request.open('GET', `${SERVER_URL}${CONTACTS_ENDPOINT}`);
    request.setRequestHeader('Authorization', `Bearer ${token}`);
    request.onload = () => {
        if (request.status === 200) {
            handleContactsResponse(request.responseText);
        } else {
            handleErrorResponse(request.status, request.statusText);
        }
    };

    request.onerror = (error) => {
        console.error('Error de red o CORS:', error);
    };

    request.send();
}

function handleContactsResponse(response) {
    try {
        const json = JSON.parse(response);
        const tbody_contactos = document.getElementById("tbody_contactos");
        tbody_contactos.innerHTML = "";

        for (const contacto of json) {
            const tr = document.createElement("tr");
            tr.appendChild(createTableCell(contacto["email"]));
            tr.appendChild(createTableCell(contacto["nombre"]));
            tr.appendChild(createTableCell(contacto["telefono"]));
            tr.appendChild(createOptionsCell(contacto["email"]));

            tbody_contactos.appendChild(tr);
        }
    } catch (error) {
        console.error('Error parsing JSON:', error);
    }
}

function createTableCell(value) {
    const td = document.createElement("td");
    td.textContent = value;
    return td;
}

function createOptionsCell(email) {
    const td = document.createElement("td");
    td.innerHTML = `<a href='/ver?email=${email}'>Ver</a> <a href='/editar?email=${email}'>Editar</a> <a href='/eliminar?email=${email}'>Borrar</a>`;
    return td;
}

function handleErrorResponse(status, statusText) {
    console.error(`Error: ${status} - ${statusText}`);
    // Puedes agregar código para mostrar mensajes de error en la interfaz de usuario
}

async function checkServerStatus() {
    try {
        const response = await fetch(`${SERVER_URL}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            document.getElementById('statusMessage').innerText = `Server response: ${data.message}`;
        } else {
            handleErrorResponse(response.status, response.statusText);
            document.getElementById('statusMessage').innerText = 'Error checking server status';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('statusMessage').innerText = 'Error checking server status';
    }
}

// Llamar a la función al cargar la página
window.onload = getAll;
