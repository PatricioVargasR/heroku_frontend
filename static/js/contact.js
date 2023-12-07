// Obtén el parámetro 'id' de la URL
const urlParams = new URLSearchParams(window.location.search);
const email = urlParams.get('email');

// Función para obtener un solo registro por su ID
function getContactById(email) {
    const token = sessionStorage.getItem('token');

    if (!token) {
        console.error('Token not found. Redirecting to login page.');
        window.location.href = '/sesion';  // Ajusta la URL según tu estructura de rutas
        return;
    }

    // Realiza una solicitud para obtener el registro por su ID, por ejemplo:
    const request = new XMLHttpRequest();
    request.open('GET', "http://localhost:8000/contactos/" + email);
    //request.open('GET', "https://herokubackendsql-03fb6209ab45.herokuapp.com/contactos/" + email);
    request.setRequestHeader('Authorization', `Bearer ${token}`);
    request.send();

    request.onload = (e) => {
        if (request.status === 200) {
            const response = request.responseText;
            const contacto = JSON.parse(response);

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

function handleErrorResponse(status, statusText) {
    console.error(`Error: ${status} - ${statusText}`);
    // Puedes agregar código para mostrar mensajes de error en la interfaz de usuario
}
