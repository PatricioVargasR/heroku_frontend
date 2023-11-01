function getContactByEmail(email) {
    var request = new XMLHttpRequest();
    // request.open('GET', "http://localhost:8000/contactos?email=" + email);
    request.open('GET', "https://herokubackendsql-03fb6209ab45.herokuapp.com/contactos?email=" + email);
    request.send();

    request.onload = (e) => {
        const response = request.responseText;
        const json = JSON.parse(response);
        console.log("status_code: " + request.status);

        if (json.length === 1) {
            const contacto = json[0];

            const tbody_contactos = document.getElementById("tbody_contactos");
            // Limpia el contenido existente en tbody_contactos
            tbody_contactos.innerHTML = "";

            var tr = document.createElement("tr");
            var td_email = document.createElement("td");
            var td_nombre = document.createElement("td");
            var td_telefono = document.createElement("td");

            td_email.innerHTML = contacto["email"];
            td_nombre.innerHTML = contacto["nombre"];
            td_telefono.innerHTML = contacto["telefono"];

            tr.appendChild(td_email);
            tr.appendChild(td_nombre);
            tr.appendChild(td_telefono);

            tbody_contactos.appendChild(tr);
        } else {
            // No se encontró ningún registro con el correo electrónico proporcionado.
            console.log("No se encontró ningún registro con el correo electrónico proporcionado.");
        }
    };
}
