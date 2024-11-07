const shopContent = document.getElementById("shopContent");
const cart = JSON.parse(localStorage.getItem('cart')) || []; // Este es nuestro carrito, un array vacío
const loginButton = document.getElementById('login-btn');
const registerButton = document.getElementById('register-btn');
const userName = document.getElementById('user_name');

// Agrega el evento de clic para el botón de inicio de sesión
if (loginButton != null && registerButton != null){

    loginButton.addEventListener('click', () => {
        window.location.href = '../formLogin.html'; // Cambia a la URL del formulario de inicio de sesión
      });
      
      // Agrega el evento de clic para el botón de registro
      registerButton.addEventListener('click', () => {
        window.location.href = '../formRegister.html'; // Cambia a la URL del formulario de registro
      });
    

}


// Función para cargar productos desde la base de datos
const loadProducts = async () => {
    try {
        const response = await fetch('/products'); // URL del endpoint
        if (!response.ok) {
            throw new Error('Error al cargar los productos');
        }
        const productos = await response.json(); // Convierte la respuesta en JSON

        productos.forEach((product) => {
            const content = document.createElement("div");
            content.innerHTML = `
                <img src="${product.img}">
                <h3>${product.product_name}</h3> <!-- Asegúrate de que el nombre de la propiedad sea correcto -->
                <p>${product.product_price} $</p> <!-- Asegúrate de que el nombre de la propiedad sea correcto -->
            `;
            shopContent.append(content);

            const buyButton = document.createElement("button");
            buyButton.innerText = "Comprar";

            content.append(buyButton);

            buyButton.addEventListener("click", () => {
                const repeat = cart.some((repeatProduct) => repeatProduct.id === product.id);

                if (repeat) {
                    cart.map((prod) => {
                        if (prod.id === product.id) {
                            prod.quanty++;
                            displayCartCounter();
                        }
                    });
                } else {
                    cart.push({
                        id: product.id,
                        productName: product.product_name, // Asegúrate de que el nombre de la propiedad sea correcto
                        price: product.product_price, // Asegúrate de que el nombre de la propiedad sea correcto
                        quanty: 1, // Cambia esto a 1 ya que es la primera compra
                        img: product.img,
                    });
                    displayCartCounter();
                    saveLocal();
                }
            });
        });
    } catch (error) {
        console.error(error);
    }
};

// Guardar carrito en localStorage
const saveLocal = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Cargar productos al inicio
loadProducts();
