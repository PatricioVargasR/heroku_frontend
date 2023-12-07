async function crearCuenta() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:8000/crear_cuenta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.mensaje);
            // Redirigir o realizar otras acciones después de crear la cuenta
        } else {
            alert('Error al crear la cuenta: ' + data.mensaje);
        }
    } catch (error) {
        console.error('Error de red:', error);
        alert('Error de red al intentar crear la cuenta');
    }
}
