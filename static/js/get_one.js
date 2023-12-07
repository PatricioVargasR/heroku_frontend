function getForEmail() {
    var email = document.getElementById("email").value;
    const token = sessionStorage.getItem('token');

    if (!token) {
        console.error('Token not found. Redirecting to login page.');
        window.location.href = '/sesion';
        return;
    }

    var request = new XMLHttpRequest();
    var url = "http://localhost:8000/contactos/" + encodeURIComponent(email);
    // var url = "https://herokubackendsql-03fb6209ab45.herokuapp.com/contactos/" + encodeURIComponent(email);

    request.open('GET', url);
    request.setRequestHeader('Authorization', `Bearer ${token}`);
    request.send();

    request.onload = function () {
        if (request.status === 200) {
            const json = JSON.parse(request.responseText);
            console.log("response: " + JSON.stringify(json));
            console.log("status_code: " + request.status);

            var tbody_contactos = document.getElementById("tbody_contactos");
            tbody_contactos.innerHTML = ''; // Limpiamos el contenido previo en cualquier caso

            var tr = document.createElement("tr");
            var td_email = document.createElement("td");
            var td_nombre = document.createElement("td");
            var td_telefono = document.createElement("td");

            td_email.innerHTML = json["email"];
            td_nombre.innerHTML = json["nombre"];
            td_telefono.innerHTML = json["telefono"];

            tr.appendChild(td_email);
            tr.appendChild(td_nombre);
            tr.appendChild(td_telefono);

            tbody_contactos.appendChild(tr);
        } else if (request.status === 404) {
            var tbody_contactos = document.getElementById("tbody_contactos");
            tbody_contactos.innerHTML = '<tr><td colspan="3">No se encontró ningún contacto con ese email.</td></tr>';
        } else {
            console.error("Error en la solicitud:", request.status, request.statusText);
        }
    };

    request.onerror = function () {
        console.error('Error de red o CORS');
    };
}
