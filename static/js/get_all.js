const SERVER_URL = "https://herokubackendsql-03fb6209ab45.herokuapp.com";
const CONTACTS_ENDPOINT = "/contactos";

async function getAll() {
    const token = sessionStorage.getItem('token');

    if (!token) {
        // Manejar la falta de token, por ejemplo, redirigir a la página de inicio de sesión
        console.error('Token not found. Redirecting to login page.');
        window.location.href = '/sesion';  // Ajusta la URL según tu estructura de rutas
        return;
    }

    try {
        const serverStatusResponse = await checkServerStatus();

        if (serverStatusResponse.status === 200) {
            const contactsResponse = await fetchContacts(token);

            if (contactsResponse.status === 200) {
                handleContactsResponse(contactsResponse.responseText);
            } else {
                handleErrorResponse(contactsResponse.status, contactsResponse.statusText);
            }
        } else if(serverStatusResponse.status === 401){
            window.location.href = "/sesion";
            return alert("Token Invalido");

        }else{
            handleErrorResponse(serverStatusResponse.status, serverStatusResponse.statusText);

        }
    } catch (error) {
        console.error('Error:', error);
        //document.getElementById('statusMessage').innerText = 'Error checking server status';
    }
}

async function fetchContacts(token) {
    const request = new XMLHttpRequest();
    request.open('GET', `${SERVER_URL}${CONTACTS_ENDPOINT}`);
    request.setRequestHeader('Authorization', `Bearer ${token}`);

    return new Promise((resolve, reject) => {
        request.onload = () => resolve(request);
        request.onerror = (error) => reject(error);
        request.send();
    });
}

function checkServerStatus() {
    return fetch(`${SERVER_URL}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    });
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

// Llamar a la función al cargar la página
window.onload = getAll;
