function insertData(email, nombre, telefono) {
    const token = sessionStorage.getItem('token');

    if (!token) {
        console.error('Token not found. Redirecting to login page.');
        window.location.href = '/sesion';
        return;
    }

    var request = new XMLHttpRequest();
    var url = "http://localhost:8000/contactos/";
    //var url = "https://herokubackendsql-03fb6209ab45.herokuapp.com/contactos"

    var data = {
        email: email,
        nombre: nombre,
        telefono: telefono
    };

    request.open('POST', url, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', `Bearer ${token}`);

    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status === 200) {
                alert(request.responseText);
                console.log(data)

                // Redirigir a la página principal (index.html)
                window.location.href = '/';
            } else {
                handleErrorResponse(request.status, request.statusText);
            }
        }
    }

    request.send(JSON.stringify(data));
}
