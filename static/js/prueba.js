function getContactoEmail(email) {
    var request = new XMLHttpRequest();
    request.open('GET', "https://herokubackendsql-03fb6209ab45.herokuapp.com/contactos/" + email);
    request.setRequestHeader('Authorization', 'Bearer' + sessionStorage.getItem('token'));
    // request.open('GET', "https://herokubackend-605c0ee15b4e.herokuapp.com/contactos?email=" + email);
    request.send();

    request.onload = (e) => {
        const response = request.responseText;
        const json = JSON.parse(response);
        console.log("json: " + json);
        console.log("status_code: " + request.status);

        const tbody_contactos = document.getElementById("tbody_contactos");
        tbody_contactos.innerHTML = "";

        if (json !== null) {

            var tr = document.createElement("tr");
            var td_email = document.createElement("td");
            var td_nombre = document.createElement("td");
            var td_telefono =  document.createElement("td");

            td_email.innerHTML = json["email"];
            td_nombre.innerHTML = json["nombre"];
            td_telefono.innerHTML = json["telefono"];


            tr.appendChild(td_email);
            tr.appendChild(td_nombre);
            tr.appendChild(td_telefono);

            tbody_contactos.appendChild(tr);

            console.log("Logrado")

        } else {
            console.log("No existe registro con el correo electronico proporcionado.");
        }
    }
}