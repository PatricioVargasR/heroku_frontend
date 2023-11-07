function insertData(nombre, telefono, email) {
    var request = new XMLHttpRequest();
    var url = "http://localhost:8000/contactos/";

    var data = {
        email: email,
        nombre: nombre,
        telefono: telefono
    };

    request.open('POST', url, true);
    request.setRequestHeader('Content-Type', 'application/json');

    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            alert(request.responseText);

            // Redirigir a la página principal (index.html)
            window.location.href = 'index.html';
        }
    }

    request.send(JSON.stringify(data));
}
