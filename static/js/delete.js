// Obtén el parámetro 'id' de la URL
const urlParams = new URLSearchParams(window.location.search);
const email = urlParams.get('email');

// Función para obtener un solo registro por su ID
function getContactById(email) {
    // Realiza una solicitud para obtener el registro por su ID, por ejemplo:
    const token = sessionStorage.getItem('token');

    if (!token) {
        console.error('Token not found. Redirecting to login page.');
        window.location.href = '/sesion';  // Ajusta la URL según tu estructura de rutas
        return;
    }

    const request = new XMLHttpRequest();
    request.open('GET', "http://localhost:8000/contactos/" + email);
    //request.open('GET', "https://herokubackendsql-03fb6209ab45.herokuapp.com/contactos/" + email);
    request.setRequestHeader('Authorization', `Bearer ${token}`);
    request.send();

    request.onload = (e) => {
        if (request.status === 200) {
            const response = request.responseText;
            const contacto = JSON.parse(response);
            console.log(contacto);

            // Ahora puedes mostrar los datos del registro en la página "ver.html"
            const detalle = document.getElementById("detalle");
            detalle.innerHTML = `
                <p>Email: ${contacto.email}</p>
                <p>Nombre: ${contacto.nombre}</p>
                <p>Teléfono: ${contacto.telefono}</p>
            `;
        } else {
            handleErrorResponse(request.status, request.statusText);
        }
    };
}

// Llama a la función para obtener y mostrar el registro
getContactById(email);

function deleteData(email) {
    const token = sessionStorage.getItem('token');

    if (!token) {
        console.error('Token not found. Redirecting to login page.');
        window.location.href = '/sesion';  // Ajusta la URL según tu estructura de rutas
        return;
    }

    const request = new XMLHttpRequest();
    request.open('DELETE', "http://localhost:8000/contactos/" + email, true);
    //request.open('DELETE', "https://herokubackendsql-03fb6209ab45.herokuapp.com/contactos/" + email, true);
    request.setRequestHeader('Authorization', `Bearer ${token}`);

    request.onload = function () {
        if (request.readyState === 4) {
            if (request.status === 200) {
                alert("Borrado con éxito");
                // Redirigir a la página principal (index.html)
                window.location.href = '/';
            } else {
                alert("Ocurrió un error");
            }
        }
    };
    request.send(null);
}
