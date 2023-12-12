const SERVER_URL = "https://herokubackendsql-03fb6209ab45.herokuapp.com";
const ENDPOINT = "/contactos/"

async function getForEmail(){
    var email = document.getElementById("email").value;
    const token = sessionStorage.getItem('token');

    if(!token){
        console.error("No se encontró un token, Redireccionando a la página de sesión");
        window.location.href ="/sesion";
        return;
    }

    try {
        const respuestaServidorStatus = await checarStatus();


        if (respuestaServidorStatus.status === 200){
            var respuestaContactos = await fetchContacts(email, token);

            // Error
            console.log(respuestaContactos)
            console.log(respuestaContactos.status);

            if (respuestaContactos.status === 200){
                manejearRespuestaContactos(respuestaContactos.responseText);
            } else if(respuestaContactos.status === 404){
                var tbody_contactos = document.getElementById("tbody_contactos");
                tbody_contactos.innerHTML = '<tr><td colspan="3">No se encontró ningún contacto con ese email.</td></tr>';
            } else {
                manejarRespuestaError(respuestaContactos.status, respuestaContactos.statusText);
            }
        } else if (respuestaServidorStatus.status == 401){
            window.location.href = "/sesion";
            return alert("Token Invalido");
        } else {
            manejarRespuestaError(respuestaServidorStatus.status, respuestaServidorStatus.statusText);
        }
    } catch(error){
        console.error("Error", error);
        //document.getElementById("statusMessage").innerHTML = "Error checando el estado del servidor";
    }
}

async function fetchContacts(email, token){
    const request = new XMLHttpRequest();
    request.open("GET",`${SERVER_URL}${ENDPOINT}${email}`);
    request.setRequestHeader('Authorization', `Bearer ${token}`);

    return new Promise((resolve, reject) => {
        request.onload = () => resolve(request);
        request.onerror = (error) => reject(error);
        request.send();
        console.log(request);

    });


}

function checarStatus(){
    return fetch(`${SERVER_URL}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    });
}

function manejearRespuestaContactos(respuestaContactos){
    try {
        const json = JSON.parse(respuestaContactos);
        console.log(json);
        console.log("response: " + JSON.stringify(json));


        var tbody_contactos = document.getElementById("tbody_contactos");
        tbody_contactos.innerHTML = ''; // Limpiamos el contenido previo en cualquier caso

        
        var tr = document.createElement("tr"); // Agregado para definir la variable tr

        tr.appendChild(crearCeldaTabla(json["email"]))
        tr.appendChild(crearCeldaTabla(json["nombre"]))
        tr.appendChild(crearCeldaTabla(json["telefono"]))


        tbody_contactos.appendChild(tr);

    } catch (error){
        console.error('Error al parsing JSON:', error)

    }

}

function crearCeldaTabla(value){
    const td = document.createElement("td");
    td.textContent = value;
    return td
}

function manejarRespuestaError(status, statusText){
    console.error(`Error: ${status} - ${statusText}`);

}
