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

        // Ahora puedes mostrar los datos del registro en la página "ver.html"
        const detalle = document.getElementById("detalle");
        detalle.innerHTML = `
            <p>Email: ${contacto.email}</p>
            <p>Nombre: ${contacto.nombre}</p>
            <p>Teléfono: ${contacto.telefono}</p>
        `;
    };
}

// Llama a la función para obtener y mostrar el registro
getContactById(email);
