function insertData(email, nombre, telefono) {

    var request = new XMLHttpRequest();
    var url = "http://localhost:8000/contactos/";
    //var url = "https://herokubackendsql-03fb6209ab45.herokuapp.com/contactos"

    var data = {
        email: email,
        nombre: nombre,
        telefono: telefono
    };

    //alert(JSON.stringify(data));

    request.open('POST', url, true);
    request.setRequestHeader('Content-Type', 'application/json');

    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            alert(request.responseText);
            console.log(data)

            // Redirigir a la página principal (index.html)
            window.location.href = 'index.html';
        }
    }

    request.send(JSON.stringify(data));
}
