async function login() {
    const user_name = document.querySelector('input[name="user_name"]').value;
    const password = document.querySelector('input[name="password"]').value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({user_name: user_name, password: password }),
    });

    const data = await response.json();
    
    
    if (response.ok) {
        // Almacenar el token en sessionStorage
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('username', data.user.user_name); // Guarda el nombre de usuario
        sessionStorage.setItem('role', data.user.role);
        
        console.log("Rol de usuario: ", data.user.role);

        if (data.user.role === 'admin') {
            window.location.href = './admin.html';
        } else {
            window.location.href = './usuarios.html';
        }
        
    } else {
        alert(data.message); // Mostrar mensaje de error
    }
}

// Función para verificar el token al cargar las páginas protegidas
function verifyToken() {
    const token = sessionStorage.getItem('token');
    if (!token) {
        // Redirigir a la página de inicio de sesión si no hay token
        window.location.href = '../index.html'; // Cambia a la ruta correcta
    }
}



// Llamar a verifyToken en páginas protegidas
document.addEventListener('DOMContentLoaded', verifyToken);